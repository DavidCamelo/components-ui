import React from 'react';
import PropTypes from 'prop-types';
import './tooltip.css';

export const Tooltip = ({ content, children }) => {
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};

Tooltip.propTypes = {
  content: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;
