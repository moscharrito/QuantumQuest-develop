import React from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';

export default function SettingsPage() {
  return (
    <TaskLayout title="Project Settings">
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">
          Settings & Permissions
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          SingIT Collaboration App settings and workflow adjustments.
        </p>
      </div>
    </TaskLayout>
  );
}