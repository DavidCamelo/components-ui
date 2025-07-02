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
    { id: 1, columnId: 'person1', startTime: '09:00', endTime: '10:30', title: 'Morning Standup', sponsor: 'Corp', sponsorId: 123, continuous: false, imsImagePath: '/path/to/image1.jpg', previewImage: 'https://placehold.co/150x80', tagLine: 'Team Sync', modifiedBy: 'user1', modifiedDate: '2025-07-01T10:00:00', startDate: '2025-07-02', endDate: '2025-07-02' },
    { id: 2, columnId: 'person2', startTime: '11:00', endTime: '12:00', title: 'Design Review', sponsor: 'Creative', sponsorId: 456, continuous: true, imsImagePath: '/path/to/image2.jpg', previewImage: 'https://placehold.co/150x80', tagLine: 'New Dashboard', modifiedBy: 'user2', modifiedDate: '2025-07-01T11:00:00', startDate: '2025-07-02', endDate: '2025-07-02' },
    { id: 3, columnId: 'person3', startTime: '14:00', endTime: '15:30', title: 'Client Meeting', sponsor: 'Sales', sponsorId: 789, continuous: false, imsImagePath: '/path/to/image3.jpg', previewImage: 'https://placehold.co/150x80', tagLine: 'Project Kickoff', modifiedBy: 'user1', modifiedDate: '2025-07-01T14:00:00', startDate: '2025-07-02', endDate: '2025-07-02' },
    { id: 4, columnId: 'person1', startTime: '11:30', endTime: '12:30', title: '1-on-1', sponsor: 'HR', sponsorId: 101, continuous: false, imsImagePath: '/path/to/image4.jpg', previewImage: 'https://placehold.co/150x80', tagLine: 'Performance Review', modifiedBy: 'user3', modifiedDate: '2025-07-01T12:00:00', startDate: '2025-07-02', endDate: '2025-07-02' },
  ];

  const [events, setEvents] = useState(initialEvents);

  const handleDateChange = (change) => {
      const newDate = new Date(currentDate);
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
