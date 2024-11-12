import React, { useState, useEffect } from 'react';
import { getUserInfo, logout } from '../services/auth';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    await logout();
    // 로그아웃 후 처리 (예: 메인 페이지로 리다이렉트)
  };

  if (!userInfo) return <div>로딩 중...</div>;

  return (
    <div className="my-page">
      <h2>내 정보</h2>
      <p>이름: {userInfo.name}</p>
      <p>이메일: {userInfo.email}</p>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={() => {/* 회원 탈퇴 처리 */}}>회원 탈퇴</button>
    </div>
  );
};

export default MyPage;

