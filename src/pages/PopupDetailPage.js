import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPopupDetails } from '../services/api';
import GoogleMap from '../components/GoogleMap';
import Review from '../components/Review';
import FavoriteButton from '../components/FavoriteButton';

const PopupDetailPage = () => {
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchPopupDetails = async () => {
      setLoading(true);
      try {
        const details = await getPopupDetails(id);
        setPopup(details);
      } catch (error) {
        console.error('팝업 정보를 불러오는데 실패했습니다:', error);
      }
      setLoading(false);
    };
    fetchPopupDetails();
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (!popup) return <div>팝업 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="popup-detail-page">
      <div className="popup-header">
        <h2>{popup.title}</h2>
        <FavoriteButton popupId={id} />
      </div>

      <div className="popup-content">
        <div className="popup-info">
          <img src={popup.image} alt={popup.title} className="popup-image" />
          <div className="popup-details">
            <p>브랜드: {popup.brandName}</p>
            <p>주소: {popup.address}</p>
            <p>기간: {popup.date}</p>
            <p>운영 시간: {popup.operatingHours}</p>
          </div>
        </div>

        <div className="popup-description">
          <h3>상세 설명</h3>
          <p>{popup.description}</p>
        </div>

        <div className="popup-location">
          <h3>위치</h3>
          <GoogleMap address={popup.address} />
        </div>

        <Review popupId={id} />
      </div>
    </div>
  );
};

export default PopupDetailPage;