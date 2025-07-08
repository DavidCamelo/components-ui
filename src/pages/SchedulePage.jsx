import React, { useState } from 'react';
import { Schedule } from '../components/schedule/Schedule';

export const SchedulePage = () => {

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduleColumns = [
    { id: 1, title: 'Alice' },
    { id: 2, title: 'Bob' },
    { id: 3, title: 'Charlie' },
    { id: 4, title: 'Diana' },
    { id: 5, title: 'David' },
    { id: 6, title: 'David' },
    { id: 7, title: 'David' },
    { id: 8, title: 'David' },
    { id: 9, title: 'David' },
    { id: 10, title: 'David' },
    { id: 11, title: 'David' },
    { id: 12, title: 'David' },
    { id: 13, title: 'David' },
    { id: 14, title: 'David' },
    { id: 15, title: 'David' },
    { id: 16, title: 'David' },
    { id: 17, title: 'David' },
    { id: 18, title: 'David' },
    { id: 19, title: 'David' },
    { id: 20, title: 'David' },
    { id: 21, title: 'David' },
    { id: 22, title: 'David' },
    { id: 23, title: 'David' },
    { id: 24, title: 'David' },
    { id: 25, title: 'David' },
    { id: 26, title: 'David' },
    { id: 27, title: 'David' },
    { id: 28, title: 'David' },
    { id: 29, title: 'David' },
    { id: 30, title: 'David' },
  ];

  const previewImage = 'https://placehold.co/150x80';

  const initialEvents = [
    { id: 1, columnId: 1, startTime: '09:00', endTime: '10:30', title: 'Morning Standup', client: 'Corp', previewImage: previewImage },
    { id: 2, columnId: 2, startTime: '11:00', endTime: '12:00', title: 'Design Review', client: 'Creative', previewImage: previewImage },
    { id: 3, columnId: 3, startTime: '14:00', endTime: '15:30', title: 'Client Meeting', client: 'Sales', previewImage: previewImage },
    { id: 4, columnId: 4, startTime: '11:30', endTime: '12:30', title: '1-on-1', client: 'HR', previewImage: previewImage },
    { id: 5, columnId: 5, startTime: '08:30', endTime: '09:30', title: 'Code Review', client: 'Engineering', previewImage: previewImage },
  ];

  const [events, setEvents] = useState(initialEvents);

  const handleDateChange = (change) => {
      let newDate = new Date(currentDate);
      if (typeof change === 'number') {
          newDate.setDate(newDate.getDate() + change);
      } else {
          newDate = new Date(change);
      }
      const formattedDate = newDate.toISOString().split('T')[0];
      console.log(`Changing date to: ${formattedDate}`);
      setCurrentDate(formattedDate);
  };

  const handleEventCreate = (newEvent) => {
    console.log(`Create new event in ${newEvent.columnId} from ${newEvent.startTime} to ${newEvent.endTime}`);
    setEvents(prev => [...prev, { ...newEvent, id: prev.length + 1, title: newEvent.title || 'New Event', client: newEvent.client || 'Client', previewImage: previewImage }]);
  };

  const handleEventUpdate = (updatedEvent) => {
    console.log(`Update event in ${updatedEvent.columnId} from ${updatedEvent.startTime} to ${updatedEvent.endTime}`);
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleEventDelete = (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
        console.log(`Deleting event: ${event.id} ${event.title}`);
        setEvents(prev => prev.filter(e => e.id !== event.id));
    }
  };

  return (
    <Schedule
      columns={scheduleColumns}
      events={events}
      onEventCreate={handleEventCreate}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      currentDate={currentDate}
      onDateChange={handleDateChange}
      allowCrossColumnDrag={true}
    />
  );
}

export default SchedulePage;
