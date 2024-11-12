import React, { useState } from 'react';
import { createPopup } from '../services/api';
import GoogleMap from '../components/GoogleMap';

const AdminPage = () => {
  const [popupData, setPopupData] = useState({
    popupName: '',
    brandName: '',
    address: '',
    operatingHours: '',
    period: '',
    description: '',
    lat: null,
    lng: null,
  });

  const handleLocationSelect = (location) => {
    setPopupData(prev => ({
      ...prev,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPopup(popupData);
      alert('팝업스토어가 성공적으로 등록되었습니다!');
      // 폼 초기화
      setPopupData({
        popupName: '',
        brandName: '',
        address: '',
        operatingHours: '',
        period: '',
        description: '',
        lat: null,
        lng: null,
      });
    } catch (error) {
      console.error('팝업 생성 실패:', error);
      alert('팝업스토어 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="admin-page">
      <h2>관리자 페이지 - 팝업 생성</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>기본 정보</h3>
          <input
            type="text"
            name="popupName"
            value={popupData.popupName}
            onChange={handleChange}
            placeholder="팝업명"
            required
          />
          <input
            type="text"
            name="brandName"
            value={popupData.brandName}
            onChange={handleChange}
            placeholder="브랜드명"
            required
          />
          <input
            type="text"
            name="operatingHours"
            value={popupData.operatingHours}
            onChange={handleChange}
            placeholder="운영 시간"
            required
          />
          <input
            type="text"
            name="period"
            value={popupData.period}
            onChange={handleChange}
            placeholder="기간 (예: 2024-09-17 ~ 2024-10-05)"
            required
          />
          <textarea
            name="description"
            value={popupData.description}
            onChange={handleChange}
            placeholder="팝업 소개"
            maxLength={200}
          />
        </div>

        <div className="form-section">
          <h3>위치 정보</h3>
          <GoogleMap onLocationSelect={handleLocationSelect} />
          {popupData.address && (
            <div className="selected-address">
              <p>선택된 주소: {popupData.address}</p>
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">팝업 생성</button>
      </form>
    </div>
  );
};

export default AdminPage;