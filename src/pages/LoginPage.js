import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, register } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login: authLogin } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        // 로그인 처리
        const response = await login(formData.username, formData.password);
        if (response.access_token) {
          authLogin(response.access_token);
          navigate(from, { replace: true });
        }
      } else {
        // 회원가입 처리
        if (formData.password !== formData.confirmPassword) {
          setError('비밀번호가 일치하지 않습니다.');
          return;
        }
        await register(formData.email, formData.username, formData.password);
        // 회원가입 성공 후 자동 로그인
        const loginResponse = await login(formData.username, formData.password);
        if (loginResponse.access_token) {
          authLogin(loginResponse.access_token);
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      console.error(isLogin ? '로그인 실패:' : '회원가입 실패:', err);
      const errorMessage = err.response?.data?.detail;
      if (typeof errorMessage === 'object' && errorMessage.msg) {
        setError(errorMessage.msg);
      } else if (typeof errorMessage === 'string') {
        setError(errorMessage);
      } else {
        setError(isLogin ? 
          '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.' : 
          '회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLogin ? '로그인' : '회원가입'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="비밀번호를 다시 입력하세요"
                required={!isLogin}
              />
            </div>
          )}
          <button type="submit" className="submit-button">
            {isLogin ? '로그인' : '회원가입'}
          </button>
          <button 
            type="button" 
            className="toggle-form-button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
              });
            }}
          >
            {isLogin ? '회원가입하기' : '로그인하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;