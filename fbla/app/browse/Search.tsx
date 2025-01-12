"use client";
// import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

const Search = () => {
//   Example data to search
//   const items = [];

//   const [query, setQuery] = useState("");
//   const [filteredItems, setFilteredItems] = useState(items);

//   const handleInputChange = (event) => {
//     const value = event.target.value.toLowerCase();
//     setQuery(value);
//     setFilteredItems(
//       items.filter((item) => item.toLowerCase().includes(value))
//     );
//   };

  return (
    <div className = "w-screen bg-text flex flex-col items-center">
      <div className="w-full p-8 flex flex-col items-center justify-center">
        <div className = "rounded-xl w-1/3 p-2 text-2xl flex justify-center items-center">
            <input
            type="text"
            placeholder="Search..."
            // value={query}
            // onChange={handleInputChange}
            className="rounded-xl w-full p-2 text-lg bg-gray-200"
            />
            <MdSearch className="text-gray-500 relative right-10"/>
        </div>
      </div>
    </div>
  );
};

export default Search;
