import React, { useState } from 'react';
import { fn } from 'storybook/test';
import { Schedule } from '../components/schedule/Schedule';

export default {
  title: 'Pages/Schedule',
  component: Schedule,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

const sampleColumns = [
  { id: 'col1', title: 'Room 1' },
  { id: 'col2', title: 'Room 2' },
  { id: 'col3', title: 'Room 3' },
];

const sampleEvents = [
  { id: 1, columnId: 'col1', startTime: '09:00', endTime: '10:30', title: 'Morning Standup', client: 'Corp', previewImage: 'https://placehold.co/150x80' },
  { id: 2, columnId: 'col2', startTime: '11:00', endTime: '12:00', title: 'Design Review', client: 'Creative', previewImage: 'https://placehold.co/150x80' },
  { id: 3, columnId: 'col1', startTime: '14:00', endTime: '15:30', title: 'Client Meeting', client: 'Sales', previewImage: 'https://placehold.co/150x80' },
];

const Template = (args) => {
    const [events, setEvents] = useState(args.events);
    const [currentDate, setCurrentDate] = useState(args.currentDate);

    const handleUpdate = (updatedEvent) => {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    };

    const handleDateChange = (change) => {
        let newDate = new Date(currentDate);
        if (typeof change === 'number') {
            newDate.setDate(newDate.getDate() + change);
        } else {
            newDate = new Date(change);
        }
        setCurrentDate(newDate.toISOString().split('T')[0]);
    };

    return <Schedule {...args} events={events} onEventUpdate={handleUpdate} currentDate={currentDate} onDateChange={handleDateChange} />
}

export const Default = Template.bind({});
Default.args = {
  columns: sampleColumns,
  events: sampleEvents,
  onEventCreate: fn(),
  onEventEdit: fn(),
  onEventDelete: fn(),
  currentDate: new Date().toISOString().split('T')[0],
  allowCrossColumnDrag: true,
};

export const NoCrossColumnDrag = Template.bind({});
NoCrossColumnDrag.args = {
  ...Default.args,
  allowCrossColumnDrag: false,
};
