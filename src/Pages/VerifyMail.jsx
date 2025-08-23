import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import useUserStore from '../Store/UseUserStore';
import { useNavigate, useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import VerifyAnimation from '../Animations/Animation - 1750419306558.json';
import { motion } from 'framer-motion';

const VerifyMail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const verifyEmail = useUserStore((state) => state.verifyEmail);
  const loading = useUserStore((state) => state.loading);

  useEffect(() => {
    const passedEmail = location.state?.email;
    if (passedEmail) {
      setEmail(passedEmail);
    } else {
      toast.error('No email found. Please sign up again.');
      navigate('/signup');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      toast.error('Please enter a valid 6-digit verification code');
      return;
    }

    const result = await verifyEmail({ email, code });

    if (result.success) {
      toast.success('Email verified successfully!');
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-100 items-center justify-center px-4 py-10">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center max-w-7xl w-full">
        {/* Animation Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-full shadow-2xl bg-white p-4 md:p-6">
            <Lottie animationData={VerifyAnimation} loop autoplay className="w-full h-full" />
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl shadow-xl"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6 text-center tracking-tight">
            Email Verification
          </h2>

          <p className="text-center text-gray-600 text-sm mb-6">
            We’ve sent a 6-digit verification code to:
            <br />
            <span className="font-semibold text-black">{email}</span>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                6-Digit Code
              </label>
              <input
                id="code"
                type="text"
                maxLength={6}
                pattern="\d{6}"
                className="w-full px-4 py-3 text-center font-mono tracking-widest bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition sm:text-sm"
                placeholder="••••••"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
              } transition`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 000 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              ) : (
                'Verify'
              )}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Didn’t receive the code?{' '}
            <button
              onClick={() => toast('Resend feature coming soon!')}
              className="text-black font-semibold hover:underline"
            >
              Resend
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyMail;
