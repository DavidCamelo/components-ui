import React from 'react';
import { fn } from 'storybook/test';
import { Pagination } from '../components/pagination/Pagination';

export default {
  title: 'Example/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  args: { onPageChange: fn() },
};

const Template = (args) => {
    const [currentPage, setCurrentPage] = React.useState(args.currentPage);
    return <Pagination {...args} currentPage={currentPage} onPageChange={setCurrentPage} />
}

export const Default = Template.bind({});
Default.args = {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
    totalItems: 100,
};
