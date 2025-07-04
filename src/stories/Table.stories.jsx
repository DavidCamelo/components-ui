import React from 'react';
import { fn } from 'storybook/test';
import { Table } from '../components/table/Table';
import { Toggle } from '../components/toggle/Toggle';
import { Select } from '../components/select/Select';
import { MultiSelect } from '../components/multi-select/MultiSelect';

export default {
  title: 'Pages/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: {
    onEdit: fn(),
    onDelete: fn(),
   },
};

const sampleColumns = [
    { header: 'Name', key: 'name' },
    { header: 'Age', key: 'age' },
    { header: 'Email', key: 'email' },
    {
      header: 'Active',
      key: 'isActive',
      render: (item) => <Toggle enabled={item.isActive} setEnabled={() => {}} />
    },
];

const sampleData = [
    { id: 1, name: 'John Doe', age: 35, email: 'john.doe@example.com', isActive: true },
    { id: 2, name: 'Jane Smith', age: 28, email: 'jane.smith@example.com', isActive: false },
    { id: 3, name: 'Sam Wilson', age: 42, email: 'sam.wilson@example.com', isActive: true },
];

export const Default = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

const statusOptions = [
    { value: 'approved', label: 'Approved' },
    { value: 'pending', label: 'Pending' },
    { value: 'rejected', label: 'Rejected' },
];

const tagOptions = [
    { value: 'ui', label: 'UI' },
    { value: 'ux', label: 'UX' },
    { value: 'dev', label: 'Development' },
    { value: 'qa', label: 'QA' },
]

const columnsWithSelects = [
    { header: 'Task', key: 'task' },
    {
        header: 'Status',
        key: 'status',
        render: (item) => <Select options={statusOptions} value={item.status} size="small" onChange={() => {}} />
    },
    {
        header: 'Tags',
        key: 'tags',
        render: (item) => <MultiSelect options={tagOptions} selectedValues={item.tags} onChange={() => {}} />
    },
];

const dataWithSelects = [
    { id: 1, task: 'Implement login page', status: 'approved', tags: ['ui', 'dev'] },
    { id: 2, task: 'Design new dashboard', status: 'pending', tags: ['ui', 'ux'] },
    { id: 3, task: 'Fix API bug', status: 'rejected', tags: ['dev'] },
];

export const WithSelects = {
    args: {
        columns: columnsWithSelects,
        data: dataWithSelects
    }
}

export const WithSorting = {
    args: {
      columns: sampleColumns,
      data: sampleData,
      onSort: fn(),
      sortBy: 'name',
      sortDirection: 'ASC'
    },
};
