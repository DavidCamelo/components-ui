import { ProgressBar } from '../components/progress-bar/ProgressBar';

export default {
  title: 'Components/Progress Bar',
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    progress: 50,
  },
};

export const Full = {
  args: {
    progress: 100,
  },
};
