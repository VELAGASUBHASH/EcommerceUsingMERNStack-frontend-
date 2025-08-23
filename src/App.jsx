import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import Signup from './Pages/Signup.jsx';
import VerifyMail from './Pages/VerifyMail.jsx';
import Login from './Pages/Login.jsx';
import Cart from './Pages/Cart.jsx';
import Navbar from './Components/Navbar.jsx';
import useUserStore from './Store/UseUserStore.js';
import { Toaster } from 'react-hot-toast';
import LoadingSpinner from './Components/LoadingSpinner.jsx';
import AdminPage from './Pages/AdminPage.jsx';
import CategoryPage from './Pages/CategoryPage.jsx';
import UseCartStore from './Store/UseCartStore.js';
import PurchaseSuccessPage from './Pages/PurchaseSuccessPage.jsx';
import PurchaseCancelPage from './Pages/PurchaseCancelPage.jsx';

const App = () => {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = UseCartStore();

  // 1. First check auth
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 2. THEN fetch cart only if user is logged in
  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, getCartItems]);

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="relative pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route
            path="/admin-dashboard"
            element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/login" />}
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
          <Route path="/purchase-success" element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />} />
          <Route path="/cancel" element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />} />
          <Route path="/verify-email" element={<VerifyMail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
