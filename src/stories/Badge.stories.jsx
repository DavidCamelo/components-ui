import { Badge } from '../components/badge/Badge';

export default {
  title: 'Example/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Default',
  },
};

export const Blue = {
  args: {
    label: 'Info',
    color: '#bfdbfe',
  },
};

export const Green = {
  args: {
    label: 'Success',
    color: '#bbf7d0',
  },
};
