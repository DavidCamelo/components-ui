import React from 'react';
import PropTypes from 'prop-types';
import './card.css';

export const Card = ({ title, children, className }) => {
  return (
    <div className={`card ${className || ''}`}>
      {title && (
        <div className="card-header">
          <h2>{title}</h2>
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  title: null,
  className: '',
};

export default Card;
