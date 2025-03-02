import React, { useState, useEffect, useRef } from 'react';

export default function ClockModal({ isOpen, onClose }) {
  const [modalStage, setModalStage] = useState("initial");
  const [clockInTime, setClockInTime] = useState(null);
  const [clockOutTime, setClockOutTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (modalStage === "running" && !isPaused) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => clearInterval(timerRef.current);
  }, [modalStage, isPaused]);

  const formatTime = (totalSec) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleClockIn = () => {
    setClockInTime(new Date());
    setElapsedSeconds(0);
    setIsPaused(false);
    setModalStage("running");
  };

  const handleClockOut = () => {
    setClockOutTime(new Date());
    setModalStage("ended");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      setModalStage("initial");
      setClockInTime(null);
      setClockOutTime(null);
      setElapsedSeconds(0);
      setIsPaused(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50" onClick={handleOverlayClick}>
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-lg shadow-xl p-5 relative">
        
        {modalStage === "initial" && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Your WorkLog!
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300">Click below to begin tracking your time.</p>
            </div>
            <div className="flex flex-col items-center">
              <button 
                onClick={handleClockIn}
                className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-xl hover:bg-green-500 transition"
              >
                Clock In
              </button>
            </div>
          </>
        )}

        {modalStage === "running" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Time Tracking</h2>
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 dark:bg-gray-900 rounded-full w-36 h-36 flex items-center justify-center shadow-2xl">
                <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {formatTime(elapsedSeconds)}
                </span>
              </div>
            </div>
            <div className="text-center mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Clocked in at: {clockInTime?.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex justify-around">
              <button onClick={() => setIsPaused(prev => !prev)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition">
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button onClick={handleClockOut}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition">
                Clock Out
              </button>
            </div>
          </>
        )}

        {modalStage === "ended" && (
          <>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">Session Summary</h2>
            <div className="text-center">
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                Clocked in: {clockInTime?.toLocaleTimeString()}
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
                Clocked out: {clockOutTime?.toLocaleTimeString()}
              </p>
              <p className="text-gray-700 dark:text-gray-200">
                Total Time: {formatTime((clockOutTime - clockInTime) / 1000)}
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={onClose} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition">
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}