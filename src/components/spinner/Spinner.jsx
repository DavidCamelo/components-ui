import React from 'react';
import PropTypes from 'prop-types';
import './spinner.css';

export const Spinner = ({ size = 'medium', progress = null }) => {
  return (
    <div className={`spinner-wrapper spinner-wrapper--${size}`}>
      <div className={`spinner spinner--${size}`} />
      {progress !== null && (
        <span className="spinner-progress-text">{`${progress}%`}</span>
      )}
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  progress: PropTypes.number,
};

Spinner.defaultProps = {
  size: 'medium',
  progress: null,
};

export default Spinner;
