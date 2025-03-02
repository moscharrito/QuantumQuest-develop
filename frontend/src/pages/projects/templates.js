import React, { useState } from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Bug Fix Template', tasks: ['Reproduce bug', 'Write test', 'Fix code'] },
    { id: 2, name: 'Feature Request Template', tasks: ['Design doc', 'Implement feature'] },
  ]);

  return (
    <TaskLayout title="Project Templates">
      <div className="space-y-4">
        {templates.map((tpl) => (
          <div key={tpl.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
              {tpl.name}
            </h3>
            <ul className="list-disc ml-5 text-gray-600 dark:text-gray-300">
              {tpl.tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </TaskLayout>
  );
}