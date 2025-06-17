import { Alert } from '../components/alert/Alert';

export default {
  title: 'Example/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Info = {
  args: {
    type: 'info',
    message: 'This is an informational alert.',
  },
};

export const Success = {
  args: {
    type: 'success',
    message: 'Operation completed successfully.',
  },
};

export const Warning = {
  args: {
    type: 'warning',
    message: 'Warning: Please check your input.',
  },
};

export const Error = {
  args: {
    type: 'error',
    message: 'An unexpected error occurred.',
  },
};
