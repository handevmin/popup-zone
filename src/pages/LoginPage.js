import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  // 이전 페이지 정보 가져오기
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await login(username, password);
      
      if (response.access_token) {
        // 로그인 성공 처리
        authLogin(response.access_token);
        // 이전 페이지로 리다이렉트
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      const errorMessage = err.response?.data?.detail;
      if (typeof errorMessage === 'object' && errorMessage.msg) {
        setError(errorMessage.msg);
      } else if (typeof errorMessage === 'string') {
        setError(errorMessage);
      } else {
        setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>로그인</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;