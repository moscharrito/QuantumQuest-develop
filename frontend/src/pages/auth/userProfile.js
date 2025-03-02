import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import ParticleBackground from "@/components/particleBackground";

const UserProfile = () => {
  const router = useRouter();

  // Placeholder for user data
  const user = {
    avatar: "/default-avatar.png",
    firstname: "Amrit",
    lastname: "Singh",
    username: "amritsingh2025",
    email: "amritsingh2025@singhit.ca",
  };

  const handleEditProfile = () => {
    router.push("/auth/updateProfile");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center">
      <ParticleBackground />
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 relative z-10 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          User Profile
        </h1>
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500 shadow-md mb-4">
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleEditProfile}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
