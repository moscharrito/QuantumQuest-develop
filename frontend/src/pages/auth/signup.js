import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ParticleBackground from '../../components/particleBackground.js';
import { signup } from '../../services/authService.js';

const Signup = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await signup(formData);
      if (response.success) {
        setSuccess('Signup successful! Please check your email to verify your account.');
        setFormData({
          firstname: '',
          lastname: '',
          email: '',
          password: '',
        });
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
          Create an Account
        </h1>
        <form onSubmit={handleSubmit}>
          {['firstname', 'lastname', 'email', 'password'].map((field, index) => (
            <div className="mb-4" key={index}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
                placeholder={`Enter ${field}`}
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Signup
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;