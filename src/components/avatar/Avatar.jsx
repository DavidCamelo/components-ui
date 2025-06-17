import React from 'react';
import PropTypes from 'prop-types';
import './avatar.css';

export const Avatar = ({ src, alt, size }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`storybook-avatar storybook-avatar--${size}`}
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

Avatar.defaultProps = {
  alt: 'Avatar',
  size: 'medium',
};

export default Avatar;
