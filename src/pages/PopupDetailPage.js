import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPopupDetails } from '../services/api';
import GoogleMap from '../components/GoogleMap';
import Review from '../components/Review';
import FavoriteButton from '../components/FavoriteButton';
import { format } from 'date-fns';

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

  if (loading) {
    return (
      <div className="popup-detail-loading">
        <div className="loading-spinner">로딩 중...</div>
      </div>
    );
  }

  if (!popup) {
    return (
      <div className="popup-detail-error">
        <p>팝업 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="popup-detail-page">
      <div className="popup-detail-container">
        <div className="popup-header">
          <div className="popup-title-section">
            <h1>{popup.title}</h1>
            <FavoriteButton popupId={id} />
          </div>
          <p className="brand-name">{popup.brandName}</p>
        </div>

        <div className="popup-content">
          <div className="popup-image-section">
          <img 
    src={popup.image_url || '/images/default-popup.jpg'} 
    alt={popup.title} 
    className="popup-main-image"
    onError={(e) => {
      e.target.onerror = null; // 무한 루프 방지
      e.target.src = '/images/default-popup.jpg'; // 디폴트 이미지 경로
    }}
  />
          </div>

          <div className="popup-info-section">
            <div className="info-item">
              <i className="icon location-icon"></i>
              <span>주소</span>
              <p>{popup.address}</p>
            </div>

            <div className="info-item">
              <i className="icon calendar-icon"></i>
              <span>운영 기간</span>
              <p>{format(new Date(popup.start_date), 'yyyy.MM.dd')} - {format(new Date(popup.end_date), 'yyyy.MM.dd')}</p>
            </div>

            <div className="info-item">
              <i className="icon time-icon"></i>
              <span>운영 시간</span>
              <p>{popup.operating_hours}</p>
            </div>
          </div>

          <div className="popup-description-section">
            <h2>상세 정보</h2>
            <p>{popup.description}</p>
          </div>

          <div className="popup-location-section">
            <h2>오시는 길</h2>
            <GoogleMap address={popup.address} />
          </div>

          <div className="popup-reviews-section">
            <h2>리뷰</h2>
            <Review popupId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailPage;