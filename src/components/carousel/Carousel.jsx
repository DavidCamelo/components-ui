import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './carousel.css';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';

export const Carousel = ({ items, autoPlayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (autoPlayInterval > 0) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1)),
        autoPlayInterval
      );
      return () => resetTimeout();
    }
  }, [currentIndex, autoPlayInterval, items.length]);


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
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
        {items.map((item, index) => (
          <div className="carousel-item" key={index}>
            {item}
          </div>
        ))}
      </div>
      <button className="carousel-control prev" onClick={goToPrevious}>
        <ChevronLeftIcon />
      </button>
      <button className="carousel-control next" onClick={goToNext}>
        <ChevronRightIcon />
      </button>
      <div className="carousel-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  autoPlayInterval: PropTypes.number,
};

Carousel.defaultProps = {
  autoPlayInterval: 3000,
};

export default Carousel;
