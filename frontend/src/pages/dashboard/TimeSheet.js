import React from 'react';

export default function TimeSheet() {
  const mockLogs = [
    { date: 'Feb 5, 2025', clockIn: '08:00 AM', clockOut: '05:00 PM', totalHours: '9h' },
    { date: 'Feb 4, 2025', clockIn: '09:00 AM', clockOut: '04:00 PM', totalHours: '7h' },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-md shadow">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Time Sheet</h2>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="text-left bg-gray-200 dark:bg-gray-700">
            <th className="p-2">Date</th>
            <th className="p-2">Clock In</th>
            <th className="p-2">Clock Out</th>
            <th className="p-2">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {mockLogs.map((log, index) => (
            <tr key={index}>
              <td className="p-2">{log.date}</td>
              <td className="p-2">{log.clockIn}</td>
              <td className="p-2">{log.clockOut}</td>
              <td className="p-2">{log.totalHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}