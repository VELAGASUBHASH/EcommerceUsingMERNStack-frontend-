import { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import CartLoginAnimation from '../Animations/Animation - 1750411112057.json';
import useUserStore from '../Store/UseUserStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading);
  const navigate = useNavigate(); // ✅ CORRECTLY placed inside component

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    const result = await login({ email, password });

    if (result?.success) {
      navigate('/'); 
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-100'>
      <Toaster position="top-center" reverseOrder={false} />

      <main className='flex flex-1 items-center justify-center px-4 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center max-w-7xl w-full'>

          {/* Animation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='flex justify-center'
          >
            <div className='w-96 h-96 rounded-full shadow-2xl bg-white p-6'>
              <Lottie
                animationData={CartLoginAnimation}
                loop
                autoplay
                className='w-full h-full'
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl shadow-xl'
          >
            <h2 className='text-3xl sm:text-4xl font-semibold text-gray-900 mb-8 text-center tracking-tight'>
              Sign In to Your Account
            </h2>

            <form onSubmit={handleSubmit} className='space-y-6'>
              <InputField
                id='email'
                type='email'
                placeholder='Email'
                icon={<Mail className='h-5 w-5 text-gray-400' />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                id='password'
                type='password'
                placeholder='Password'
                icon={<Lock className='h-5 w-5 text-gray-400' />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type='submit'
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
                } transition`}
              >
                {loading ? (
                  <svg className='animate-spin h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 000 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z' />
                  </svg>
                ) : (
                  <>
                    <LogIn className='h-5 w-5' />
                    Login
                  </>
                )}
              </button>

              <p className='text-sm text-center text-gray-500 mt-6'>
                Don’t have an account?{' '}
                <Link to='/signup' className='text-black font-semibold hover:underline'>
                  Create one
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

const InputField = ({ id, type, placeholder, icon, value, onChange }) => (
  <div>
    <label htmlFor={id} className='block text-sm font-medium text-gray-700 mb-1'>
      {placeholder}
    </label>
    <div className='relative'>
      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
        {icon}
      </div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className='w-full px-3 py-3 pl-10 bg-gray-50 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black sm:text-sm transition'
        placeholder={placeholder}
      />
    </div>
  </div>
);

export default Login;
