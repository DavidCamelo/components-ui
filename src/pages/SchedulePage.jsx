import React, { useState } from 'react';
import { Schedule } from '../components/schedule/Schedule';

export const SchedulePage = () => {
  const menuItems = [ { name: 'Home', href: '#' }, { name: 'Schedule', href: '#' } ];

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  const scheduleColumns = [
    { id: 'person1', title: 'Alice' },
    { id: 'person2', title: 'Bob' },
    { id: 'person3', title: 'Charlie' },
    { id: 'person4', title: 'Diana' },
  ];

  const initialEvents = [
    { id: 1, columnId: 'person1', startTime: '09:00', endTime: '10:30', title: 'Morning Standup', client: 'Corp', previewImage: 'https://placehold.co/150x80' },
    { id: 2, columnId: 'person2', startTime: '11:00', endTime: '12:00', title: 'Design Review', client: 'Creative', previewImage: 'https://placehold.co/150x80' },
    { id: 3, columnId: 'person3', startTime: '14:00', endTime: '15:30', title: 'Client Meeting', client: 'Sales', previewImage: 'https://placehold.co/150x80' },
    { id: 4, columnId: 'person1', startTime: '11:30', endTime: '12:30', title: '1-on-1', client: 'HR', previewImage: 'https://placehold.co/150x80' },
  ];

  const [events, setEvents] = useState(initialEvents);

  const handleDateChange = (change) => {
      let newDate = new Date(currentDate);
      if (typeof change === 'number') {
          newDate.setDate(newDate.getDate() + change);
      } else {
          newDate = new Date(change);
      }
      setCurrentDate(newDate.toISOString().split('T')[0]);
  };

  const handleEventCreate = (newEvent) => {
    alert(`Create new event in ${newEvent.columnId} from ${newEvent.startTime} to ${newEvent.endTime}`);
    // Here you would typically open a form modal and then add the event to state
  };

  const handleEventUpdate = (updatedEvent) => {
    setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const handleEventDelete = (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
        alert(`Deleting event: ${event.title}`);
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
    />
  );
}

export default SchedulePage;
