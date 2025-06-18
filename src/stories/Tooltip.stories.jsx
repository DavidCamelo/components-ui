import { Tooltip } from '../components/tooltip/Tooltip';
import { Button } from '../components/button/Button';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    content: 'This is a tooltip!',
    children: <Button label="Hover Me" />,
  },
};
