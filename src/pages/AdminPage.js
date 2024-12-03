// pages/AdminPage.js
import React, { useState } from 'react';
import { createPopup } from '../services/api';
import GoogleMap from '../components/GoogleMap';

const AdminPage = () => {
  const [popupData, setPopupData] = useState({
    popupName: '',
    brandName: '',
    address: '',
    operatingHours: '',
    startDate: '',
    endDate: '',
    description: '',
    lat: null,
    lng: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLocationSelect = (location) => {
    setPopupData(prev => ({
      ...prev,
      address: location.address,
      lat: location.lat,
      lng: location.lng,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      // 필수 입력값 검증
      if (!popupData.lat || !popupData.lng) {
        throw new Error('지도에서 위치를 선택해주세요.');
      }
  
      if (!popupData.startDate || !popupData.endDate) {
        throw new Error('운영 기간을 입력해주세요.');
      }
  
      // 날짜 유효성 검사
      const startDate = new Date(popupData.startDate);
      const endDate = new Date(popupData.endDate);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('올바른 날짜 형식을 입력해주세요.');
      }
  
      if (endDate <= startDate) {
        throw new Error('종료일은 시작일보다 늦어야 합니다.');
      }
  
      // API 호출
      await createPopup(popupData);
      
      setSuccess(true);
      // 폼 초기화
      setPopupData({
        popupName: '',
        brandName: '',
        address: '',
        operatingHours: '',
        startDate: '',
        endDate: '',
        description: '',
        lat: null,
        lng: null,
      });
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('팝업 생성 실패:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h2>관리자 페이지 - 팝업스토어 등록</h2>
        
        {success && (
          <div className="success-message">
            팝업스토어가 성공적으로 등록되었습니다!
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-section">
              <h3>기본 정보</h3>
              <div className="form-group">
                <label htmlFor="popupName">팝업스토어명</label>
                <input
                  id="popupName"
                  type="text"
                  name="popupName"
                  value={popupData.popupName}
                  onChange={handleChange}
                  required
                  placeholder="팝업스토어 이름을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="brandName">브랜드명</label>
                <input
                  id="brandName"
                  type="text"
                  name="brandName"
                  value={popupData.brandName}
                  onChange={handleChange}
                  required
                  placeholder="브랜드 이름을 입력하세요"
                />
              </div>

              <div className="form-group">
                <label htmlFor="operatingHours">운영 시간</label>
                <input
                  id="operatingHours"
                  type="text"
                  name="operatingHours"
                  value={popupData.operatingHours}
                  onChange={handleChange}
                  required
                  placeholder="예: 10:00 - 21:00"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">시작일</label>
                  <input
                    id="startDate"
                    type="date"
                    name="startDate"
                    value={popupData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="endDate">종료일</label>
                  <input
                    id="endDate"
                    type="date"
                    name="endDate"
                    value={popupData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">상세 설명</label>
                <textarea
                  id="description"
                  name="description"
                  value={popupData.description}
                  onChange={handleChange}
                  required
                  placeholder="팝업스토어에 대한 상세 설명을 입력하세요"
                  rows="4"
                />
              </div>
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
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? '등록 중...' : '팝업스토어 등록'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;