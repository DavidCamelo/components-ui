import { Breadcrumbs } from '../components/breadcrumbs/Breadcrumbs';

export default {
  title: 'Example/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Laptops' },
    ],
  },
};
