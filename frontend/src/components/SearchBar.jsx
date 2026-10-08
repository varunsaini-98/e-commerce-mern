import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  return showSearch ? (
    <div className="search-bar-overlay">
      <input
        type="text"
        placeholder="Search catalog..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => setShowSearch(false)}>✖</button>
    </div>
  ) : null;
};

export default SearchBar;
