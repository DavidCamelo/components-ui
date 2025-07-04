import React from 'react';
import PropTypes from 'prop-types';
import './progress-bar.css';

export const ProgressBar = ({ progress }) => {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="progressbar-container">
      <div
        className="progressbar-bar"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
