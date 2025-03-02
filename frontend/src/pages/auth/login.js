import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ParticleBackground from '@/components/particleBackground';
import { login } from '@/services/authService';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Login Request Data:', formData);

    try {
      const response = await login(formData);
      if (response.success) {
        console.log('Login Successful:', response);
        window.location.href = '/dashboard';
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      console.error('Login Failed:', err.message);
      setError(err.message || 'Invalid credentials. Please try again.');
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
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Login to continue managing your projects.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              placeholder="Enter your password"
              required
            />
          </div>
          <p className="mt-5 mb-4 text-right text-gray-600 dark:text-gray-400">
            Forgot your password?{' '}
            <Link href="/auth/forgot-password" className="text-blue-500 hover:underline">
              Reset it here
            </Link>
          </p>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          New user or Freelancer?{' '}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;