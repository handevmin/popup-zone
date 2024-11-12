import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupCard from '../components/PopupCard';
import { getFavoritePopups } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FavoritePopupsPage = () => {
  const [favoritePopups, setFavoritePopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchFavorites();
  }, [isAuthenticated, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await getFavoritePopups();
      setFavoritePopups(response.data);
      setError(null);
    } catch (err) {
      console.error('관심 팝업스토어 불러오기 실패:', err);
      setError('관심 팝업스토어를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="favorite-popups-page">
      <h2>관심 팝업스토어</h2>
      {favoritePopups.length === 0 ? (
        <div className="no-favorites">
          <p>관심 등록된 팝업스토어가 없습니다.</p>
        </div>
      ) : (
        <div className="popup-grid">
          {favoritePopups.map((popup) => (
            <PopupCard 
              key={popup.id} 
              popup={popup}
              onFavoriteChange={fetchFavorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePopupsPage;