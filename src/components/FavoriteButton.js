import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const FavoriteButton = ({ popupId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && popupId) {
      checkFavoriteStatus();
    }
  }, [isAuthenticated, popupId]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await api.get(`/popups/${popupId}/favorite/status`);
      setIsFavorite(response.data.is_favorite);
    } catch (error) {
      console.error('관심 상태 확인 실패:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      const response = await api.post(`/popups/${popupId}/favorite`);
      setIsFavorite(response.data.is_favorite);
    } catch (error) {
      console.error('관심 등록/해제 실패:', error);
      alert('관심 등록/해제에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={loading}
      className={`favorite-button ${isFavorite ? 'active' : ''}`}
    >
      {loading ? '처리 중...' : (isFavorite ? '❤️ 관심 해제' : '🤍 관심 등록')}
    </button>
  );
};

export default FavoriteButton;