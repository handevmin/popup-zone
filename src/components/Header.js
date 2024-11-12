import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header>
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>Popup Zone</h1>
        </Link>
        <SearchBar />
        <nav>
          <Link to="/popup-report">팝업제보</Link>
          {isAuthenticated ? (
            <>
              <Link to="/favorites">관심팝업</Link>
              <Link to="/mypage">마이페이지</Link>
              <button onClick={handleLogout} className="logout-button">
                로그아웃
              </button>
              {user?.is_admin && (
                <Link to="/admin" className="admin-link">
                  관리자
                </Link>
              )}
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;