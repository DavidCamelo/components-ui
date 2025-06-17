import React from 'react';
import { ResourcePage } from '../components/resource-page/ResourcePage';
import { Toggle } from '../components/toggle/Toggle';

export default {
  title: 'Example/Resource Page',
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
        getAll: async () => {
            await delay(200);
            if (shouldFail) throw new Error("Network error: Failed to fetch data.");
            return data;
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
    { name: 'Name', key: 'name' },
    { name: 'Role', key: 'role' },
    { name: 'Status', key: 'active', render: (item) => <Toggle enabled={item.active} setEnabled={() => {}} /> }
];

const userFormFields = [
    { label: 'Full Name', name: 'name', type: 'text' },
    { label: 'Role', name: 'role', type: 'text' },
    { label: 'Active', name: 'active', type: 'toggle' },
];

const initialUsers = [
    { id: 1, name: 'John Doe (Admin)', role: 'Developer', active: true },
    { id: 2, name: 'Jane Smith', role: 'Designer', active: false },
];

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
    service: createMockService(initialUsers, true), // will fail on getAll
    columns: userColumns,
    formFields: userFormFields,
  },
  play: async () => {
      // In a real test, you would assert that the error message is visible.
      // This story demonstrates what happens on initial load failure.
      // To test other failures:
      // - Try to delete "John Doe (Admin)"
      // - Try to create a new user with the name "fail"
  }
};
