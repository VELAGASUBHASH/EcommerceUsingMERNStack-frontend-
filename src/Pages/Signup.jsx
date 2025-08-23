import { useState } from 'react';
import { Mail, Lock, UserPlus2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // ✅ IMPORT useNavigate
import Lottie from 'lottie-react';
import shoppingCartAnimation from '../Animations/Animation - 1750408543703.json';
import { Toaster } from 'react-hot-toast';
import useUserStore from '../Store/UseUserStore.js';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const signup = useUserStore((state) => state.signup);
  const loading = useUserStore((state) => state.loading);

  const navigate = useNavigate(); // ✅ DEFINE useNavigate INSIDE COMPONENT

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(formData);

    if (result.success) {
      navigate('/verify-email', { state: { email: formData.email } }); // ✅ Redirect with email
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-gradient-to-br from-white to-gray-100'>
      <Toaster position="top-center" reverseOrder={false} />

      <main className='flex flex-1 items-center justify-center px-4 py-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 items-center max-w-7xl w-full'>

          {/* Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='flex justify-center'
          >
            <div className='w-72 h-72 md:w-96 md:h-96 rounded-full shadow-2xl bg-white p-4 md:p-6'>
              <Lottie
                animationData={shoppingCartAnimation}
                loop
                autoplay
                className='w-full h-full'
              />
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className='w-full max-w-md bg-white p-6 sm:p-10 rounded-2xl shadow-xl'
          >
            <h2 className='text-3xl sm:text-4xl font-semibold text-gray-900 mb-8 text-center tracking-tight'>
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit} className='space-y-5 sm:space-y-6'>
              <InputField
                id='name'
                type='text'
                placeholder='Full Name'
                icon={<UserPlus2 className='h-5 w-5 text-gray-400' />}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <InputField
                id='email'
                type='email'
                placeholder='Email'
                icon={<Mail className='h-5 w-5 text-gray-400' />}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <InputField
                id='password'
                type='password'
                placeholder='Password'
                icon={<Lock className='h-5 w-5 text-gray-400' />}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <InputField
                id='confirmpassword'
                type='password'
                placeholder='Confirm Password'
                icon={<Lock className='h-5 w-5 text-gray-400' />}
                value={formData.confirmpassword}
                onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
              />

              <button
                type='submit'
                disabled={loading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
                  loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-900'
                } transition`}
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 000 16v-4l-4 4 4 4v-4a8 8 0 01-8-8z"></path>
                  </svg>
                ) : (
                  'Sign Up'
                )}
              </button>

              <p className='text-sm text-center text-gray-500 mt-6'>
                Already have an account?{' '}
                <Link to='/login' className='text-black font-semibold hover:underline'>
                  LogIn
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

export default Signup;
