import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import UseCartStore from '../Store/UseCartStore';
import { toast } from 'react-hot-toast';

const GiftCoupon = () => {
  const [UserInputCode, setUserInputCode] = useState('');
  const { coupon, isCouponApplied, applyCoupon, removeCoupon, getMyCoupon } = UseCartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  useEffect(() => {
    if (coupon && typeof coupon.code === 'string') {
      setUserInputCode(coupon.code);
    }
  }, [coupon]);

  const handleApplyCoupon = () => {
    if (typeof UserInputCode !== 'string' || !UserInputCode.trim()) {
      toast.error("Please enter a valid coupon code");
      return;
    }
    applyCoupon(UserInputCode.trim());
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
  };

  return (
    <motion.div
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div>
        <label htmlFor="voucher" className="block text-sm font-medium text-gray-800 mb-2">
          Have a gift card or voucher?
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="voucher"
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your code"
            value={UserInputCode || ''}
            onChange={(e) => setUserInputCode(e.target.value)}
          />
          <motion.button
            type="button"
            onClick={handleApplyCoupon}
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 transition"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Apply
          </motion.button>
        </div>
      </div>

      {isCouponApplied && coupon && (
        <div className="rounded-xl bg-gray-50 p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">Coupon Applied</h4>
              <p className="text-sm text-gray-600">
                {coupon.code} - {coupon.discountPercentage}% off
              </p>
            </div>
            <motion.button
              type="button"
              onClick={handleRemoveCoupon}
              className="rounded-full px-4 py-1.5 text-xs font-medium text-black border border-black hover:bg-gray-100 transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Remove
            </motion.button>
          </div>
        </div>
      )}

      {coupon && !isCouponApplied && (
        <div className="text-sm text-gray-500 pt-2">
          Available Coupon: <strong>{coupon.code}</strong> – {coupon.discountPercentage}% off
        </div>
      )}
    </motion.div>
  );
};

export default GiftCoupon;
