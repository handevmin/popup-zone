import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const PopupSlider = ({ popups }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="popup-slider">
      <Slider {...settings}>
        {popups.map((popup) => (
          <div key={popup.id} className="slider-item">
            <img src={popup.image || '/images/default-popup.jpg'} alt={popup.title} />
            <div className="slider-info">
              <h3>{popup.title}</h3>
              <p>{popup.location}</p>
              <p>{popup.date}</p>
              <Link to={`/popup/${popup.id}`} className="slider-button">자세히 보기</Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopupSlider;
