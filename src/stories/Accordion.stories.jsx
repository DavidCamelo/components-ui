import { Accordion } from '../components/accordion/Accordion';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    items: [
      { title: 'Section 1', content: 'This is the content for section 1.' },
      { title: 'Section 2', content: 'This is the content for section 2.' },
      { title: 'Section 3', content: 'This is the content for section 3.' },
    ],
  },
};
