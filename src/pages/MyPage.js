import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserInfo } from '../services/auth';

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const info = await getUserInfo();
        setUserInfo(info);
      } catch (error) {
        console.error('사용자 정보 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const handleWithdrawal = async () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      try {
        // 회원 탈퇴 API 호출
        await withdraw();
        logout();
        navigate('/');
      } catch (error) {
        console.error('회원 탈퇴 실패:', error);
      }
    }
  };

  if (loading) return <div className="my-page loading">로딩 중...</div>;

  return (
    <div className="my-page">
      <div className="my-page-container">
        <h2>내 정보</h2>
        
        <div className="user-info-section">
          <div className="info-group">
            <label>이메일</label>
            <p>{userInfo?.email}</p>
          </div>
          
          <div className="info-group">
            <label>사용자명</label>
            <p>{userInfo?.username}</p>
          </div>

        </div>

        <div className="action-buttons">
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            로그아웃
          </button>
          <button 
            className="withdraw-button"
            onClick={handleWithdrawal}
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;