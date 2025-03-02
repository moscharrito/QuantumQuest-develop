import React from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';

export default function CalendarPage() {
  const events = [
    { date: '2023-09-10', title: 'Release Beta' },
    { date: '2023-09-15', title: 'Design Review' },
  ];

  return (
    <TaskLayout title="Calendar View">
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        SingIT Task Management Calendar
      </p>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-100">Upcoming Dates</h3>
        <ul className="space-y-2">
          {events.map((evt, i) => (
            <li key={i} className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <strong>{evt.date}:</strong> {evt.title}
            </li>
          ))}
        </ul>
      </div>
    </TaskLayout>
  );
}