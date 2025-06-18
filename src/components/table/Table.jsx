import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import { ChevronDownIcon, ChevronUpIcon } from '../../icons';
import './table.css';

export const Table = ({ columns, data, onEdit, onDelete, onSort, sortBy, sortDirection }) => {
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item);
    }
    return item[column.key];
  };

  const handleSort = (columnKey) => {
    if (!onSort) return;
    const isAsc = sortBy === columnKey && sortDirection === 'ASC';
    onSort(columnKey, isAsc ? 'DESC' : 'ASC');
  };

  return (
    <div className="storybook-table-wrapper">
      <table className="storybook-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => handleSort(col.key)} className={onSort ? 'sortable' : ''}>
                <div className="table-header-content">
                  {col.header}
                  {sortBy === col.key && (
                    <span className="sort-icon">
                      {sortDirection === 'ASC' ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              {columns.map((col) => (
                <td key={col.key}>{renderCell(item, col)}</td>
              ))}
              <td>
                <div className="storybook-table-actions">
                  <Button size="small" onClick={() => onEdit(item)} label="Edit" />
                  <Button size="small" primary backgroundColor="hsl(0, 79%, 63%)" onClick={() => onDelete(item)} label="Delete" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onSort: PropTypes.func,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.oneOf(['ASC', 'DESC']),
};

Table.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
  onSort: null,
  sortBy: null,
  sortDirection: 'ASC',
};

export default Table;
