"use client";
import React, { useState } from "react";

const Search = () => {
  // Example data to search
  const items = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
  ];

  // State for the search query and filtered results
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  // Handle input change
  const handleInputChange = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);
    setFilteredItems(
      items.filter((item) => item.toLowerCase().includes(value))
    );
  };

  return (
    <div className="w-screen bg-primary p-8">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="rounded-xl w-1/3 p-2"
      />
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </div>
  );
};

export default Search;
