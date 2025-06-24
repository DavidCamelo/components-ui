import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '../select/Select';
import { Input } from '../input/Input';
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '../../icons';
import './pagination.css';

export const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageInputChange = (e) => {
    const page = parseInt(e.target.value, 5);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <nav className="storybook-pagination-container">
      <div className="pagination-group">
        <div className="items-per-page-selector">
          <span className="pagination-label">Items per page:</span>
          <Select
            name="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            options={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 25, label: '25' },
              { value: 50, label: '50' },
              { value: 100, label: '100' },
            ]}
            size="small"
          />
        </div>
        <span className="item-range-display">
          {startItem} - {endItem} of {totalItems} items
        </span>
      </div>
      <div className="pagination-group">
        <button onClick={() => onPageChange(1)} disabled={isFirstPage} className="nav-arrow">
          <ChevronDoubleLeftIcon />
        </button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={isFirstPage} className="nav-arrow">
          <ChevronLeftIcon />
        </button>
        <div className="page-info">
          <span className="pagination-label">Page</span>
          <Input
            name="currentPage"
            type="number"
            value={currentPage}
            onChange={handlePageInputChange}
            size="small"
            className="page-input"
          />
          <span className="pagination-label">of {totalPages}</span>
        </div>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={isLastPage} className="nav-arrow">
          <ChevronRightIcon />
        </button>
        <button onClick={() => onPageChange(totalPages)} disabled={isLastPage} className="nav-arrow">
          <ChevronDoubleRightIcon />
        </button>
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default Pagination;
