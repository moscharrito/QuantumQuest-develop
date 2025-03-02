import React, { useState } from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';
import { useRouter } from 'next/router';

export default function TaskDetailPage() {
  const router = useRouter();
  const { taskId } = router.query;

  // Demo data for initial UI setup (to be integrated with backend later)
  const [task, setTask] = useState({
    id: taskId,
    title: 'Design User Profile Page',
    description: 'Create a responsive user profile page with editing capabilities.',
    status: 'In Progress',
    priority: 'High',
    dueDate: '2025-09-30',
    assignee: 'Kennedy',
    comments: [
      { user: 'Saheel', text: 'Remember to handle mobile layout', createdAt: '2023-09-01' },
    ],
  });

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const commentObj = {
      user: 'You',
      text: newComment,
      createdAt: new Date().toLocaleDateString(),
    };
    setTask((prev) => ({
      ...prev,
      comments: [...prev.comments, commentObj],
    }));
    setNewComment('');
  };

  return (
    <TaskLayout title={`Task: ${task.title}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{task.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Priority:</strong> {task.priority}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Due Date:</strong> {task.dueDate}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          <strong>Assignee:</strong> {task.assignee}
        </p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Comments</h3>
          <div className="space-y-3 mb-4">
            {task.comments.map((c, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-700 p-3 rounded">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  <strong>{c.user}:</strong> {c.text}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{c.createdAt}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-white"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </TaskLayout>
  );
}