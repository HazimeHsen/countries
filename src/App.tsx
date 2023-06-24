import React, { useEffect, useState } from "react";

interface Country {
  name: string;
  region: string;
  area: number;
}

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v2/all?fields=name,region,area"
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const sortCountries = (sortBy: string) => {
    const sortedCountries = [...countries];
    if (sortBy === "name-asc") {
      sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      sortedCountries.sort((a, b) => b.name.localeCompare(a.name));
    }
    setCountries(sortedCountries);
  };

  const filterCountries = (filterBy: string) => {
    if (filterBy === "smaller-than-lithuania") {
      const filteredCountries = countries.filter(
        (country) => country.area < 65300
      );
      setCountries(filteredCountries);
    } else if (filterBy === "oceania") {
      const filteredCountries = countries.filter(
        (country) => country.region === "Oceania"
      );
      setCountries(filteredCountries);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-bold">
          Sort by:
        </label>
        <select
          id="sort"
          onChange={(e) => sortCountries(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1">
          <option value="name-asc">Name (Ascending)</option>
          <option value="name-desc">Name (Descending)</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-bold">
          Filter by:
        </label>
        <select
          id="filter"
          onChange={(e) => filterCountries(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1">
          <option value="smaller-than-lithuania">Smaller than Lithuania</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
      <ul>
        {countries.map((country, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded px-4 py-2 mb-2 flex justify-between items-center">
            <div>
              <strong className="text-lg font-bold">{country.name}</strong>
              <div className="text-gray-500">{country.region}</div>
            </div>
            <div className="text-gray-700">{country.area}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
