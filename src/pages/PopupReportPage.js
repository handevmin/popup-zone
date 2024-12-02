import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reportPopup } from '../services/api';

const PopupReportPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    popupName: '',
    brandName: '',
    address: '',
    period: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await reportPopup(formData);
      setSuccess(true);
      // 폼 초기화
      setFormData({
        popupName: '',
        brandName: '',
        address: '',
        period: '',
        description: ''
      });
      // 3초 후 메인 페이지로 이동
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.detail || '팝업 제보 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-report-page">
      <h2>팝업 제보하기</h2>
      
      {success && (
        <div className="success-message">
          팝업스토어가 성공적으로 제보되었습니다! 잠시 후 메인 페이지로 이동합니다.
        </div>
      )}

      <form onSubmit={handleSubmit} className="popup-report-form">
        <div className="form-group">
          <label htmlFor="popupName">팝업 이름</label>
          <input
            id="popupName"
            type="text"
            name="popupName"
            value={formData.popupName}
            onChange={handleChange}
            placeholder="팝업스토어 이름을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brandName">브랜드 이름</label>
          <input
            id="brandName"
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            placeholder="브랜드 이름을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="팝업스토어의 주소를 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="period">운영 기간</label>
          <input
            id="period"
            type="text"
            name="period"
            value={formData.period}
            onChange={handleChange}
            placeholder="예: 2024-03-01 ~ 2024-03-31"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">세부 내용</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="팝업스토어에 대한 자세한 설명을 입력하세요"
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? '제보 중...' : '제보하기'}
        </button>
      </form>
    </div>
  );
};

export default PopupReportPage;