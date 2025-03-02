import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from '@/components/forms/Button';
import ClockModal from '@/components/ClockModal';
import {
  FiHome,
  FiClipboard,
  FiClock,
  FiBarChart2,
  FiSettings,
  FiCast,
  FiChevronDown,
} from 'react-icons/fi';

const navItems = [
  { label: 'Home', icon: <FiHome />, href: '/' },
  { label: 'Projects & Tasks', icon: <FiClipboard />, href: '/projects' },
  { label: 'Shift & Time Sheet', icon: <FiClock />, href: '/dashboard/TimeSheet' },
  { label: 'Analytics', icon: <FiBarChart2 />, href: '/dashboard/analytics' },
  { label: 'Chats', icon: <FiCast />, href: '/dashboard/chat' },
  { label: 'Settings', icon: <FiSettings />, href: '/dashboard/settings' },
];

export default function DashboardHome({ children, pageTitle }) {
  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  const [showClockModal, setShowClockModal] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    window.location.href = '/auth/login';
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 dark:bg-black transition-colors duration-300">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="container mx-auto px-4 py-2 flex items-center">
          <div className="relative w-16 h-16 mr-4">
            <Image
              src="/favicon.ico"
              alt="SingIT Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <h1 className="flex-1 text-center text-lg md:text-3xl font-bold text-gray-600 dark:text-gray-50">
            {pageTitle || 'Collaboration Dashboard'}
          </h1>
          <div className="flex items-center space-x-4 relative">
            <Button
              onClick={() => setShowClockModal(true)}
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:opacity-90"
            >
              Clockin
            </Button>
            <div
              className="relative cursor-pointer flex items-center"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 overflow-hidden">
                <Image
                  src="/default-avatar.png"
                  alt="Avatar"
                  width={40}
                  height={40}
                />
              </div>
              <FiChevronDown className="ml-1 text-gray-600 dark:text-gray-300" />
            </div>
            {showDropdown && (
              <div className="absolute top-14 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow py-2 w-44 z-50">
                <button
                  onClick={() => router.push('/auth/userProfile')}
                  className="block w-full text-left px-4 py-2 bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-800 hover:bg-blue-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500" />
      </header>
      <main className="container mx-auto px-4 py-6 flex-1">
        {children}
      </main>
      <div className="group fixed bottom-0 left-0 right-0 z-50">
      <nav
        className="
          fixed bottom-0 w-full mx-auto py-2
          flex justify-evenly items-center
          bg-white dark:bg-gray-900
          border-t border-gray-200 dark:border-gray-800
          shadow-t-2xl
        "
      >
      {navItems.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <Button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="mx-1 mb-0 flex flex-col items-center bg-gray-400 dark:bg-gray-800 text-gray-600 dark:text-gray-200 hover:bg-gradient-to-r hover:from-blue-400 hover:via-purple-500 hover:to-pink-500 hover:text-white"
            >
              <span className="text-xs">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Button>
          );
      })}
      </nav>
      </div>
      <ClockModal isOpen={showClockModal} onClose={() => setShowClockModal(false)} />
    </div>
  );
}