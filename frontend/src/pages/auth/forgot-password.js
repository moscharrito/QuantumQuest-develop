import React, { useState } from 'react';
import Image from 'next/image';
import ParticleBackground from '@/components/particleBackground';
import { forgotPassword } from '@/services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const response = await forgotPassword({ email });
      setMessage('Reset link sent! Please check your email.');
      setShowModal(true);
    } catch (err) {
      setError(err.response?.data?.detail || 'User Account Not Found. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center">
      <ParticleBackground />
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 relative z-10 dark:bg-gray-800">
        <div className="flex justify-center mb-6">
          <Image src="/favicon.ico" alt="Company Logo" width={100} height={120} />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Send Reset Link
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Success!</h2>
            <p className="text-gray-600 dark:text-gray-300">
              A password reset link has been sent to your email. Please check your inbox.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-transform"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;