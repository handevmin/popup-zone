import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import FloatingBar from './components/FloatingBar';
import MainPage from './pages/MainPage';
import SearchResultPage from './pages/SearchResultPage';
import PopupDetailPage from './pages/PopupDetailPage';
import FavoritePopupsPage from './pages/FavoritePopupsPage';
import LoginPage from './pages/LoginPage';
import MyPage from './pages/MyPage';
import PopupReportPage from './pages/PopupReportPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/popup/:id" element={<PopupDetailPage />} />
            <Route 
              path="/favorites" 
              element={
                <PrivateRoute>
                  <FavoritePopupsPage />
                </PrivateRoute>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/mypage" 
              element={
                <PrivateRoute>
                  <MyPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/popup-report" 
              element={
                <PrivateRoute>
                  <PopupReportPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/admin" 
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              } 
            />
          </Routes>
          <FloatingBar />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;