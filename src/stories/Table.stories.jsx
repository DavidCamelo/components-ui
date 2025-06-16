import React from 'react';
import { fn } from 'storybook/test';
import { Table } from '../components/table/Table';
import { Toggle } from '../components/toggle/Toggle';
import { Select } from '../components/select/Select';
import { MultiSelect } from '../components/multi-select/MultiSelect';

export default {
  title: 'Example/Table',
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
    { name: 'John Doe', age: 35, email: 'john.doe@example.com', isActive: true },
    { name: 'Jane Smith', age: 28, email: 'jane.smith@example.com', isActive: false },
    { name: 'Sam Wilson', age: 42, email: 'sam.wilson@example.com', isActive: true },
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
        render: (item) => <Select options={statusOptions} value={item.status} onChange={() => {}} />
    },
    {
        header: 'Tags',
        key: 'tags',
        render: (item) => <MultiSelect options={tagOptions} selectedValues={item.tags} onChange={() => {}} />
    },
];

const dataWithSelects = [
    { task: 'Implement login page', status: 'approved', tags: ['ui', 'dev'] },
    { task: 'Design new dashboard', status: 'pending', tags: ['ui', 'ux'] },
    { task: 'Fix API bug', status: 'rejected', tags: ['dev'] },
];


export const WithSelects = {
    args: {
        columns: columnsWithSelects,
        data: dataWithSelects
    }
}
