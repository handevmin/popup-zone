import React, { useState } from 'react';
import { reportPopup } from '../services/api';

const PopupReportPage = () => {
  const [popupName, setPopupName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [address, setAddress] = useState('');
  const [period, setPeriod] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportPopup({ popupName, brandName, address, period, description });
      // 제보 성공 후 처리 (예: 성공 메시지 표시, 메인 페이지로 리다이렉트)
    } catch (error) {
      console.error('팝업 제보 실패:', error);
      // 에러 처리 (예: 에러 메시지 표시)
    }
  };

  return (
    <div className="popup-report-page">
      <h2>팝업 제보하기</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={popupName}
          onChange={(e) => setPopupName(e.target.value)}
          placeholder="팝업명"
          required
        />
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="브랜드명"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소"
          required
        />
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="기간 (예: 2024-09-17 ~ 2024-10-05)"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="세부 내용"
          maxLength={200}
        />
        <button type="submit">제보하기</button>
      </form>
    </div>
  );
};

export default PopupReportPage;

