import React from 'react';
import PropTypes from 'prop-types';
import './progress-bar.css';

export const ProgressBar = ({ progress }) => {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="storybook-progressbar-container">
      <div
        className="storybook-progressbar-bar"
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
