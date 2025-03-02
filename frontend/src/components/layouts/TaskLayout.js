import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiMenu,
  FiGrid,
  FiClipboard,
  FiAlertCircle,
  FiFolder,
  FiX,
  FiCalendar,
  FiSettings,
  FiRepeat,
} from 'react-icons/fi';

export default function TaskLayout({ children, title = 'Project Management' }) {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <aside
        className={`
          bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 
          border-r border-gray-200 dark:border-gray-700
          flex flex-col
          ${drawerOpen ? 'w-64' : 'w-16'}
          transition-all duration-300
        `}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          {drawerOpen ? (
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              Project Board
            </h1>
          ) : (
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
              PB
            </h1>
          )}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {drawerOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/projects" legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FiFolder />
                  {drawerOpen && <span>Projects</span>}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects/board" legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FiGrid />
                  {drawerOpen && <span>Kanban Board</span>}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects/all" legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FiClipboard />
                  {drawerOpen && <span>All Tasks (List View)</span>}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects/calendar" legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FiCalendar />
                  {drawerOpen && <span>Calendar</span>}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects/issues" legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FiAlertCircle />
                  {drawerOpen && <span>Issues</span>}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects/templates" legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FiRepeat />
                  {drawerOpen && <span>Templates</span>}
                </a>
              </Link>
            </li>
            <li>
              <Link href="/projects/settings" legacyBehavior>
                <a className="flex items-center gap-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <FiSettings />
                  {drawerOpen && <span>Project Settings</span>}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
        </header>
        <div className="p-4 flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
