import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Review = ({ popupId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [popupId]);

  const fetchReviews = async () => {
    try {
      const response = await api.get(`/popups/${popupId}/reviews`);
      setReviews(response.data);
      setError(null);
    } catch (error) {
      console.error('리뷰를 불러오는데 실패했습니다:', error);
      setError('리뷰를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('리뷰를 작성하려면 로그인이 필요합니다.');
      return;
    }

    try {
      await api.post(`/popups/${popupId}/reviews`, {
        content: newReview,
        rating: rating
      });
      setNewReview('');
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.error('리뷰 작성에 실패했습니다:', error);
      alert('리뷰 작성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'yyyy.MM.dd HH:mm', { locale: ko });
    } catch {
      return '';
    }
  };

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  if (loading) return <div className="loading">리뷰 로딩 중...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="reviews-section">
      <h3>리뷰</h3>
      
      {user && (
        <form onSubmit={handleSubmitReview} className="review-form">
          <div className="rating-input">
            <label>평점:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="rating-select"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {renderStars(num)}
                </option>
              ))}
            </select>
          </div>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰를 작성해주세요..."
            required
            className="review-textarea"
          />
          <button type="submit" className="submit-review">리뷰 작성</button>
        </form>
      )}

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">아직 작성된 리뷰가 없습니다.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <span className="review-rating">{renderStars(review.rating)}</span>
                <span className="review-date">{formatDate(review.created_at)}</span>
              </div>
              <p className="review-content">{review.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review;