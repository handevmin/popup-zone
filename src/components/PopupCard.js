import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PopupCard = ({ popup }) => {
  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'yyyy.MM.dd');
    } catch {
      return dateString;
    }
  };

  // 기본 이미지
  const defaultImage = '/images/default-popup.jpg';

  return (
    <div className="popup-card">
      <img 
        src={popup.image_url || defaultImage} 
        alt={popup.title || popup.popup_name} 
        onError={(e) => {
          e.target.src = defaultImage;
        }}
      />
      <div className="popup-info">
        <h3>{popup.title || popup.popup_name}</h3>
        <p className="brand-name">{popup.brand_name}</p>
        <p className="location">{popup.address}</p>
        <p className="date">
          {formatDate(popup.start_date)} ~ {formatDate(popup.end_date)}
        </p>
        <Link to={`/popup/${popup.id}`} className="details-button">
          자세히 보기
        </Link>
      </div>
    </div>
  );
};

export default PopupCard;