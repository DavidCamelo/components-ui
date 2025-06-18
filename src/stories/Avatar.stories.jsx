import { Avatar } from '../components/avatar/Avatar';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    src: 'https://placehold.co/100x100',
    alt: 'User Avatar',
  },
};

export const Small = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Large = {
  args: {
    ...Default.args,
    size: 'large',
  },
};
