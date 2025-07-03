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
  { id: 1, columnId: 'col1', startTime: '09:00', endTime: '10:30', title: 'Morning Standup', sponsor: 'Corp', sponsorId: 123, continuous: false, imsImagePath: '/path/to/image1.jpg', previewImage: 'https://placehold.co/150x80', tagLine: 'Team Sync', modifiedBy: 'user1', modifiedDate: '2025-07-01T10:00:00', startDate: '2025-07-02', endDate: '2025-07-02' },
  { id: 2, columnId: 'col2', startTime: '11:00', endTime: '12:00', title: 'Design Review', sponsor: 'Creative', sponsorId: 456, continuous: true, imsImagePath: '/path/to/image2.jpg', previewImage: 'https://placehold.co/150x80', tagLine: 'New Dashboard', modifiedBy: 'user2', modifiedDate: '2025-07-01T11:00:00', startDate: '2025-07-02', endDate: '2025-07-02' },
  { id: 3, columnId: 'col1', startTime: '14:00', endTime: '15:30', title: 'Client Meeting', sponsor: 'Sales', sponsorId: 789, continuous: false, imsImagePath: '/path/to/image3.jpg', previewImage: 'https://placehold.co/150x80', tagLine: 'Project Kickoff', modifiedBy: 'user1', modifiedDate: '2025-07-01T14:00:00', startDate: '2025-07-02', endDate: '2025-07-02' },
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
  onEventDelete: fn(),
  currentDate: new Date().toISOString().split('T')[0],
};
