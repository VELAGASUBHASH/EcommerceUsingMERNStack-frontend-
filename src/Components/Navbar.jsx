import React from 'react';
import {
  ShoppingBasketIcon,
  Lock,
  UserPlus2,
  LogIn,
  LogOut,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useUserStore from '../Store/UseUserStore.js';
import UseCartStore from '../Store/UseCartStore.js';

const Navbar = () => {
  const { user, logout } = useUserStore(); // Assuming logout method exists in the store

  const isAdmin = user?.role === 'admin'; // Safe check with optional chaining
  const {cart} = UseCartStore();


  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg border-b border-gray-200 z-50 text-gray-900">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-3 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          CodeKart
        </Link>


        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-800 hover:text-black transition-colors"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-800 hover:text-black transition"
            >
              <ShoppingBasketIcon size={20} />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded-full leading-tight">
                {cart.length}
              </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin-dashboard"
              className="bg-black text-white px-3 py-1.5 rounded-md flex items-center hover:bg-gray-900 transition"
            >
              <Lock size={18} className="mr-1" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          )}

          {user ? (
            <button
              onClick={logout} // Call logout function
              className="bg-gray-900 hover:bg-black text-white px-3 py-1.5 rounded-md flex items-center transition"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline ml-2">Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/signup"
                className="flex items-center hover:text-black transition"
              >
                <UserPlus2 className="mr-1" size={18} />
                <span className="hidden sm:inline">Signup</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center hover:text-black transition"
              >
                <LogIn className="mr-1" size={18} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
