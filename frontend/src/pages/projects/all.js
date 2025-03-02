import React, { useState } from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';

export default function AllTasksPage() {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Set up staging server', assignee: 'Moshood', status: 'To Do' },
    { id: '2', title: 'Fix payment bug', assignee: 'Kennedy', status: 'In Progress' },
    { id: '3', title: 'Update design system', assignee: 'Saheel', status: 'Review' },
  ]);

  return (
    <TaskLayout title="All Tasks (List View)">
      <table className="w-full bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Assignee</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{task.title}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{task.assignee}</td>
              <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TaskLayout>
  );
}