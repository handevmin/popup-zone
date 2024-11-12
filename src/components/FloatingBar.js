import React from 'react';
import { Link } from 'react-router-dom';

const FloatingBar = () => {
  return (
    <div className="floating-bar">
      <Link to="/popup-report">팝업제보</Link>
      <Link to="/favorites">관심팝업</Link>
      <Link to="/login">로그인</Link>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        맨 위로
      </button>
    </div>
  );
};

export default FloatingBar;

