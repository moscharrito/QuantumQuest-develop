import React, { useState } from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';

export default function IssuesPage() {
  const [issues, setIssues] = useState([
    {
      id: 'ISSUE-101',
      title: 'Login error on Safari',
      severity: 'High',
      status: 'Open',
      assignee: 'Kennedy',
    },
    {
      id: 'ISSUE-102',
      title: 'Payment Gateway Timeout',
      severity: 'Critical',
      status: 'In Progress',
      assignee: 'Saheel',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueSeverity, setIssueSeverity] = useState('Medium');

  const handleCreateIssue = () => {
    if (!issueTitle.trim()) return;
    const newIssue = {
      id: 'ISSUE-' + Date.now(),
      title: issueTitle,
      severity: issueSeverity,
      status: 'Open',
      assignee: 'Unassigned',
    };
    setIssues([...issues, newIssue]);
    setIssueTitle('');
    setIssueSeverity('Medium');
    setShowForm(false);
  };

  return (
    <TaskLayout title="Issues / Bugs">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Issue Tracker</h3>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Report Issue
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4">
          <h4 className="font-bold mb-2">New Issue</h4>
          <input
            type="text"
            placeholder="Issue Title"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
          />
          <select
            value={issueSeverity}
            onChange={(e) => setIssueSeverity(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded p-2 w-full mb-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCreateIssue}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Save
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white dark:bg-gray-800 shadow rounded-lg">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Severity</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Assignee</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr
                key={issue.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-2">{issue.id}</td>
                <td className="px-4 py-2">{issue.title}</td>
                <td className="px-4 py-2">{issue.severity}</td>
                <td className="px-4 py-2">{issue.status}</td>
                <td className="px-4 py-2">{issue.assignee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TaskLayout>
  );
}