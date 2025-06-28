import React from 'react';
import { PrivateRoute } from '../components/private-route/PrivateRoute';
import { Button } from '../components/button/Button';
import { Alert } from '../components/alert/Alert';

export default {
  title: 'Components/Private Route',
  component: PrivateRoute,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const HasPermission = {
  args: {
    hasPermission: true,
    children: <Alert type="success" message="You can see this because you have permission." />,
  },
};

export const NoPermission = {
  args: {
    hasPermission: false,
    children: <Alert type="error" message="This content should not be visible." />,
  },
};

export const NoPermissionWithCustomMessage = {
    args: {
      hasPermission: false,
      children: <p>This should not be visible</p>,
      fallbackMessage: "Please log in as an administrator to see this."
    },
  };

export const WithAdminButton = {
    render: (args) => (
        <div>
            <p>The button below is wrapped in a PrivateRoute.</p>
            <PrivateRoute {...args}>
                <Button primary label="Admin Action" />
            </PrivateRoute>
            <p style={{marginTop: '1rem', fontSize: '0.8rem', color: '#666'}}>
                Toggle the `hasPermission` control below to see the fallback message.
            </p>
        </div>
    ),
    args: {
        hasPermission: true,
    }
}
