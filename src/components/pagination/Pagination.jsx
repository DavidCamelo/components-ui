import React from 'react';
import PropTypes from 'prop-types';
import './pagination.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    // Basic implementation, for complex scenarios consider a library
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <nav className="storybook-pagination">
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`storybook-pagination-button ${
            currentPage === pageNumber ? 'active' : ''
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
