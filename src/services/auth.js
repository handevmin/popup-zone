import api from './api';

export const register = async (email, username, password) => {
  try {
    const response = await api.post('/auth/register', {
      email,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    // URLSearchParams 사용
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      return response.data;
    }
    throw new Error('로그인 실패: 토큰이 없습니다.');
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
};

export const getUserInfo = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('사용자 정보 가져오기 실패:', error);
    throw error;
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }
  return false;
};