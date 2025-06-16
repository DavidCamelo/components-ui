import React from 'react';
import PropTypes from 'prop-types';
import './table.css';
import Button from '../button/Button';

export const Table = ({ columns, data, onEdit, onDelete }) => {
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item);
    }
    return item[column.key];
  };

  return (
    <div className="storybook-table-wrapper">
      <table className="storybook-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.name}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
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
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

Table.defaultProps = {
  onEdit: () => {},
  onDelete: () => {},
};

export default Table;
