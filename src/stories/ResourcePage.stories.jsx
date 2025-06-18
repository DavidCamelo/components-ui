import React from 'react';
import { ResourcePage } from '../components/resource-page/ResourcePage';
import { Toggle } from '../components/toggle/Toggle';

export default {
  title: 'Pages/Resource Page',
  component: ResourcePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs']
};

// Mock service for Storybook
const createMockService = (initialData = [], shouldFail = false) => {
    let data = [...initialData];
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    return {
        getAll: async ({ pageNumber = 1, pageSize = 10, sortBy = 'id', sortDirection = 'ASC' }) => {
            await delay(200);
            if (shouldFail) throw new Error("Network error: Failed to fetch data.");

            const sortedData = [...data].sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return sortDirection === 'ASC' ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return sortDirection === 'ASC' ? 1 : -1;
                return 0;
            });

            const start = (pageNumber - 1) * pageSize;
            const end = start + pageSize;
            const paginatedContent = sortedData.slice(start, end);

            return {
                content: paginatedContent,
                pageable: { pageNumber: pageNumber - 1, pageSize },
                totalElements: data.length,
                totalPages: Math.ceil(data.length / pageSize),
                size: pageSize,
                number: pageNumber - 1,
                numberOfElements: paginatedContent.length,
            };
        },
        create: async (newItem) => {
            await delay(200);
            if (newItem.name.toLowerCase().includes('fail')) {
                throw new Error("Validation error: Name cannot include 'fail'.");
            }
            const newEntry = { ...newItem, id: Math.max(0, ...data.map(d => d.id)) + 1 };
            data.push(newEntry);
            return newEntry;
        },
        update: async (id, updatedItem) => {
            await delay(200);
            if (shouldFail) throw new Error("Network error: Failed to update.");
            data = data.map(item => (item.id === id ? { ...item, ...updatedItem } : item));
            return updatedItem;
        },
        delete: async (id) => {
            await delay(200);
            if (id === 1) throw new Error("Permission Denied: Cannot delete admin user.");
            data = data.filter(item => item.id !== id);
            return { id };
        },
    };
};

const userColumns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Role', key: 'role' },
    { header: 'Status', key: 'active', render: (item) => <Toggle enabled={item.active} setEnabled={() => {}} /> }
];

const userFormFields = [
    { label: 'Full Name', name: 'name', type: 'text' },
    { label: 'Role', name: 'role', type: 'text' },
    { label: 'Active', name: 'active', type: 'toggle' },
];

const initialUsers = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    role: ['Admin', 'Editor', 'Viewer'][(i + 1) % 3],
    active: (i + 1) % 2 === 0,
}));

export const UserManagement = {
  args: {
    title: 'User Management',
    resourceName: 'User',
    service: createMockService(initialUsers),
    columns: userColumns,
    formFields: userFormFields,
  },
};

export const WithErrorHandling = {
  args: {
    title: 'Error Handling Demo',
    resourceName: 'User',
    service: createMockService(initialUsers, true),
    columns: userColumns,
    formFields: userFormFields,
  },
};
