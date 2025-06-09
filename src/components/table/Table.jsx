import React from 'react';
import './table.css';

const Table = ({ columns, data, onEdit, onDelete }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead className="bg-gray-800 text-white">
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="py-3 px-4 text-left">{col.header}</th>
          ))}
          <th className="py-3 px-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        {data.length === 0 ? (
            <tr><td colSpan={columns.length + 1} className="text-center py-4">No data found.</td></tr>
        ) : data.map((row) => (
          <tr key={row.id} className="border-b hover:bg-gray-100">
            {columns.map((col) => (
                <td key={`${col.key}-${row.id}`} className="py-3 px-4">
                    {col.render ? col.render(row) : row[col.key]}
                </td>
            ))}
            <td className="py-3 px-4 text-center">
              <button onClick={() => onEdit(row)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
              <button onClick={() => onDelete(row.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
