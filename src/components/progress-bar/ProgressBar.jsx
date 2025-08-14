import React from 'react';
import PropTypes from 'prop-types';
import './progress-bar.css';

export const ProgressBar = ({ progress, showPercentage }) => {
  const safeProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="progressbar-container">
      <div
        className="progressbar-bar"
        style={{ width: `${safeProgress}%` }}
      >
        {showPercentage && (
            <span className="progressbar-percentage-text">
                {`${safeProgress}%`}
            </span>
        )}
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  showPercentage: PropTypes.bool,
};

ProgressBar.defaultProps = {
    showPercentage: false,
};

export default ProgressBar;
