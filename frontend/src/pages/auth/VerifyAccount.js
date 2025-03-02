import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { verifyAccount } from "../../services/authService";
import ParticleBackground from "../../components/particleBackground";
import { Loader } from "lucide-react";
import Image from "next/image";

const VerifyAccount = () => {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState("Verifying your account...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      verifyAccount(token)
        .then(() => {
          setMessage("Your account has been successfully verified! Redirecting to login...");
          setTimeout(() => {
            router.push("/auth/login");
          }, 4000);
        })
        .catch(() => {
          setMessage("Invalid or expired token. Please request a new verification link.");
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <ParticleBackground />
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 relative z-10 dark:bg-gray-800 text-center">
        <div className="flex justify-center mb-4">
            <Image src="/favicon.ico" alt="Company Logo" width={100} height={120} />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">Account Verification</h1>
        {loading ? (
          <Loader className="animate-spin text-blue-600 mx-auto" size={32} />
        ) : (
          <p className={`mt-4 text-lg ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;