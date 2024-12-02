import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components/SearchBar.js
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="팝업스토어 검색..."
          className="search-input"
        />
        <button type="submit" className="search-button">검색</button>
      </div>
    </form>
  );
};

export default SearchBar;
