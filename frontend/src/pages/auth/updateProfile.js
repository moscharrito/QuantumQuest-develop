import React, { useState } from 'react';
import Image from 'next/image';
import ParticleBackground from '@/components/particleBackground';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: 'johndoe',
    email: 'johndoe@example.com',
    firstname: 'John',
    lastname: 'Doe',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for API call to update user profile
    console.log('Profile updated:', formData, profileImage);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center">
      <ParticleBackground />
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 relative z-10 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">User Profile Update</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-6">
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Profile Preview"
                width={120}
                height={120}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>

          <div className="flex justify-center mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
