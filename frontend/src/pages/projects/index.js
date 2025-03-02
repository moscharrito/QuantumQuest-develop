import React, { useState } from 'react';
import TaskLayout from '@/components/layouts/TaskLayout';

// Reusable Modal component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  // For demonstration, the current user is hardcoded.
  // Privileged user "hr@singhit.ca" can create projects/tasks; other users see only their assignments.
  const currentUser = "hr@singhit.ca";
  const isPrivileged = currentUser === "hr@singhit.ca";

  // Sample projects with tasks (each task includes title, status, assignee, and description)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Marketing Website',
      progress: 70,
      tasks: [
        {
          id: 101,
          title: 'Design Homepage',
          status: 'To Do',
          assignee: 'Alice',
          description: 'Design the homepage layout and incorporate branding.',
        },
        {
          id: 102,
          title: 'Setup CMS',
          status: 'In Progress',
          assignee: 'Bob',
          description: 'Integrate a content management system.',
        },
      ],
    },
    {
      id: 2,
      name: 'Mobile App Redesign',
      progress: 45,
      tasks: [
        {
          id: 201,
          title: 'Redesign Login',
          status: 'Review',
          assignee: 'Charlie',
          description: 'Revamp the login experience.',
        },
        {
          id: 202,
          title: 'Implement New UI',
          status: 'To Do',
          assignee: 'Dana',
          description: 'Develop new UI components.',
        },
      ],
    },
    {
      id: 3,
      name: 'API Integration',
      progress: 90,
      tasks: [
        {
          id: 301,
          title: 'Develop API endpoints',
          status: 'Done',
          assignee: 'Eve',
          description: 'Create and test API endpoints.',
        },
      ],
    },
  ]);

  // For privileged users, all projects/tasks are visible.
  // For normal users, you might filter tasks/projects by assignment.
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  // Modal states for new project, new task, and task details
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);

  // Form states for new project and new task
  const [newProjectName, setNewProjectName] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('To Do');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  // For file uploads (simulate attachment in task creation)
  const [newTaskFiles, setNewTaskFiles] = useState([]);

  // For Task Details Modal
  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  // Handler to create a new project
  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    const newProj = {
      id: Date.now(),
      name: newProjectName,
      progress: 0,
      tasks: [],
    };
    const updatedProjects = [...projects, newProj];
    setProjects(updatedProjects);
    setSelectedProject(newProj);
    setNewProjectName('');
    setShowProjectModal(false);
  };

  // Handler to create a new task for the selected project (including file uploads)
  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      status: newTaskStatus,
      assignee: newTaskAssignee || 'Unassigned',
      description: '', // Detailed description can be added later via updates
      attachments: newTaskFiles, // Array of File objects (or filenames from backend)
    };
    const updatedProjects = projects.map((proj) => {
      if (proj.id === selectedProject.id) {
        return { ...proj, tasks: [...proj.tasks, newTask] };
      }
      return proj;
    });
    setProjects(updatedProjects);
    setSelectedProject(updatedProjects.find((p) => p.id === selectedProject.id));
    setNewTaskTitle('');
    setNewTaskStatus('To Do');
    setNewTaskAssignee('');
    setNewTaskFiles([]);
    setShowTaskModal(false);
  };

  // Task filter state (by title, status, or assignee)
  const [taskFilter, setTaskFilter] = useState('');
  // For normal users, filter tasks further (e.g. tasks assigned to currentUser)
  const filteredTasks =
    (isPrivileged
      ? selectedProject?.tasks
      : selectedProject?.tasks.filter(
          (task) =>
            task.assignee.toLowerCase() === currentUser.toLowerCase()
        ))?.filter(
      (task) =>
        task.title.toLowerCase().includes(taskFilter.toLowerCase()) ||
        task.status.toLowerCase().includes(taskFilter.toLowerCase()) ||
        task.assignee.toLowerCase().includes(taskFilter.toLowerCase())
    ) || [];

  // Open Task Details Modal when a task is clicked
  const handleOpenTaskDetails = (task) => {
    setSelectedTaskDetails(task);
    setShowTaskDetailsModal(true);
  };

  // Handler for file selection in Create Task modal
  const handleFileChange = (e) => {
    setNewTaskFiles([...e.target.files]);
  };

  return (
    <TaskLayout title="Projects Overview">
      <div className="flex gap-4">
        {/* Left Projects Navigation Panel */}
        <aside className="w-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Projects
            </h3>
            {isPrivileged && (
              <button
                onClick={() => setShowProjectModal(true)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                New
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {projects.map((proj) => (
              <li
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedProject.id === proj.id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : ''
                }`}
              >
                <h4 className="font-bold text-gray-800 dark:text-gray-100">
                  {proj.name}
                </h4>
                <div className="mt-1 bg-gray-200 dark:bg-gray-700 h-2 rounded">
                  <div
                    className="bg-blue-500 h-2 rounded"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Right Main Content: Tasks for Selected Project */}
        <main className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              {selectedProject?.name} – Tasks
            </h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search tasks..."
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
              />
              {isPrivileged && (
                <button
                  onClick={() => setShowTaskModal(true)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Create Task
                </button>
              )}
            </div>
          </div>
          <div className="space-y-4">
            {filteredTasks.length ? (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  onClick={() => handleOpenTaskDetails(task)}
                >
                  <h4 className="font-bold text-gray-800 dark:text-gray-100">
                    {task.title}
                  </h4>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {task.status}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Assignee: {task.assignee}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No tasks found for this project.
              </p>
            )}
          </div>
        </main>
      </div>

      {/* Modal for Creating a New Project */}
      {isPrivileged && (
        <Modal
          isOpen={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          title="New Project"
        >
          <input
            type="text"
            placeholder="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Save
            </button>
            <button
              onClick={() => setShowProjectModal(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Modal for Creating a New Task */}
      {isPrivileged && (
        <Modal
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          title={`New Task for ${selectedProject?.name}`}
        >
          <input
            type="text"
            placeholder="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white mb-4"
          />
          <div className="flex gap-2 mb-4">
            <select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white flex-1"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Done">Done</option>
            </select>
            <input
              type="text"
              placeholder="Assignee"
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* File upload for attachments (simulate file updates) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Attach Files
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 dark:bg-gray-700 dark:text-gray-300"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCreateTask}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Save
            </button>
            <button
              onClick={() => setShowTaskModal(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* Modal for Task Details (with file upload for updates) */}
      <Modal
        isOpen={showTaskDetailsModal}
        onClose={() => setShowTaskDetailsModal(false)}
        title={selectedTaskDetails?.title}
      >
        {selectedTaskDetails && (
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              <strong>Status:</strong> {selectedTaskDetails.status}
            </p>
            <p className="mb-2 text-gray-600 dark:text-gray-300">
              <strong>Assignee:</strong> {selectedTaskDetails.assignee}
            </p>
            {selectedTaskDetails.description && (
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                <strong>Description:</strong> {selectedTaskDetails.description}
              </p>
            )}
            {/* File upload field for adding attachments/updates */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Update Attachments
              </label>
              <input
                type="file"
                multiple
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 dark:bg-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowTaskDetailsModal(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </TaskLayout>
  );
}