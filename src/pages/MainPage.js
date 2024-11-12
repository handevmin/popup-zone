import React, { useState, useEffect } from 'react';
import PopupSlider from '../components/PopupSlider';
import PopupCard from '../components/PopupCard';
import api from '../services/api';

const MainPage = () => {
  const [popularPopups, setPopularPopups] = useState([]);
  const [allPopups, setAllPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopups = async () => {
      try {
        setLoading(true);
        // 데이터 구조 로그 확인
        const [popularResponse, allResponse] = await Promise.all([
          api.get('/popups/popular'),
          api.get('/popups')
        ]);

        console.log('Popular Popups Response:', popularResponse.data);
        console.log('All Popups Response:', allResponse.data);

        // 데이터가 바로 배열인 경우를 처리
        setPopularPopups(popularResponse.data);
        setAllPopups(allResponse.data);
        
        setError(null);
      } catch (err) {
        console.error("팝업 데이터를 불러오는 데 실패했습니다:", err);
        setError("데이터를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchPopups();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="main-page">
      {popularPopups?.length > 0 && (
        <div className="popular-section">
          <h2>인기 팝업스토어</h2>
          <PopupSlider popups={popularPopups} />
        </div>
      )}
      
      <div className="all-popups-section">
        <h2>모든 팝업스토어</h2>
        {allPopups?.length > 0 ? (
          <div className="popup-grid">
            {allPopups.map((popup) => (
              <PopupCard key={popup.id} popup={popup} />
            ))}
          </div>
        ) : (
          <div className="no-popups-message">
            <p>현재 등록된 팝업스토어가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;