import React, { useState } from 'react';
import Image from 'next/image';
import ParticleBackground from '../../components/particleBackground.js';
import { resetPassword } from '../../services/authService.js';
import { useRouter } from 'next/router';

const CreateNewPassword = () => {
  const [formData, setFormData] = useState({ new_password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (formData.new_password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await resetPassword({ token, new_password: formData.new_password });
      setSuccess(true);
      setFormData({ new_password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
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
          Create New Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Confirm your new password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Update Password
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">
            Your password has been successfully updated!
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateNewPassword;