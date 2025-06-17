import { Spinner } from '../components/spinner/Spinner';

export default {
  title: 'Example/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {},
};

export const Small = {
    args: {
        size: 'small'
    },
};

export const Large = {
    args: {
        size: 'large'
    },
};
