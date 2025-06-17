import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './carousel.css';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';

export const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="storybook-carousel">
      <div className="storybook-carousel-inner" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div className="storybook-carousel-item" key={index}>
            {item}
          </div>
        ))}
      </div>
      <button className="storybook-carousel-control prev" onClick={goToPrevious}>
        <ChevronLeftIcon />
      </button>
      <button className="storybook-carousel-control next" onClick={goToNext}>
        <ChevronRightIcon />
      </button>
      <div className="storybook-carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`storybook-carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default Carousel;
