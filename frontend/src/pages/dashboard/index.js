import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Button from '@/components/forms/Button';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ['To Do', 'In Progress', 'Review', 'Done'],
  datasets: [
    {
      label: 'Tasks by Status',
      data: [8, 4, 2, 6],
      backgroundColor: ['#f87171', '#fbbf24', '#60a5fa', '#34d399'],
      hoverOffset: 4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function DashboardHome() {
  // time logs
  const timeLogs = [
    {
      in: '08:00 AM',
      out: '10:00 AM',
      date: 'February 4, 2025',
      task: 'Project Alpha',
    },
    {
      in: '09:30 AM',
      out: '10:45 AM',
      date: 'February 3, 2025',
      task: 'UI Redesign',
    },
    {
      in: '07:50 AM',
      out: '08:30 AM',
      date: 'February 2, 2025',
      task: 'API Setup',
    },
  ];
  return (
    <DashboardLayout pageTitle="Collaboration Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transform hover:scale-105 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
            Active Tasks
          </h2>
          <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tasks currently open
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transform hover:scale-105 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
            Completed Today
          </h2>
          <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">5</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tasks closed in last 24h
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transform hover:scale-105 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
            Hours Logged
          </h2>
          <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">8.5</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Today’s tracked hours
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transform hover:scale-105 hover:shadow-xl transition">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100">
            Upcoming Deadlines
          </h2>
          <p className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">3</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Due within next 2 days
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-4 transform hover:scale-[1.01] hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
            Tasks by Status
          </h2>
          <div className="relative w-full h-64">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:scale-[1.01] hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
            Recent Time Logs
          </h2>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-200">
            {timeLogs.map((log, i) => (
              <li key={i} className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <p>
                  <strong>Clocked In:</strong> {log.in},{' '}
                  <strong>Clocked Out:</strong> {log.out}
                </p>
                <p>
                  <strong>Date:</strong> {log.date}
                </p>
                <p>
                  <strong>Task/Project:</strong> {log.task}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transform hover:scale-[1.01] hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
            Recent Activity
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="text-gray-600 dark:text-gray-200">
              You created <strong>Task #45</strong> in <strong>Project Alpha</strong>.
            </li>
            <li className="text-gray-600 dark:text-gray-200">
              Amrit Singh clocked in at 09:02 AM.
            </li>
            <li className="text-gray-600 dark:text-gray-200">
              Amrit Singh completed <strong>Task #39</strong>.
            </li>
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transform hover:scale-[1.01] hover:shadow-xl transition">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-100 mb-4">
            My In-Progress Tasks
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  Task #46: Create UI wireframes
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Due: Friday, May 10
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded-md">
                View
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  Task #47: Database schema update
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Due: Monday, May 13
                </p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded-md">
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}