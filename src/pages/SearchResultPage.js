import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PopupCard from '../components/PopupCard';
import { searchPopups } from '../services/api';

const SearchResultPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      const results = await searchPopups(searchQuery);
      setSearchResults(results);
      setLoading(false);
    };
    fetchSearchResults();
  }, [searchQuery]);

  if (loading) return <div>검색 중...</div>;

  return (
    <div className="search-result-page">
      <h2>"{searchQuery}" 검색 결과</h2>
      {searchResults.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="popup-grid">
          {searchResults.map((popup) => (
            <PopupCard key={popup.id} popup={popup} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultPage;

