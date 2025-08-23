import { motion } from "framer-motion";
import  useCartStore  from "../Store/UseCartStore.js";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../Library/Axios.js";

const stripePromise = loadStripe(
  "pk_test_51RXjVTRvnT11wUHg9iPEMJGHYHMQTx866DpYNSkTTJHhSjQyg9z1aJZ0yhtnyr4TDtV2meDS0IYBTVMaq9dD0tnZ00BxZqeTXz"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payment/create-checkout-session", {
      products: cart,
      couponCode: coupon ? coupon.code : null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <motion.div
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Original Price</span>
          <span>₹{formattedSubtotal}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-black font-medium">
            <span>You Saved</span>
            <span>-₹{formattedSavings}</span>
          </div>
        )}

        {coupon && isCouponApplied && (
          <div className="flex justify-between text-black font-medium">
            <span>Coupon ({coupon.code})</span>
            <span>-{coupon.discountPercentage}%</span>
          </div>
        )}

        <div className="border-t pt-3 flex justify-between text-base font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{formattedTotal}</span>
        </div>
      </div>

      <motion.button
        onClick={handlePayment}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="w-full rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-900 transition"
      >
        Proceed to Checkout
      </motion.button>

      <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
        <span>or</span>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-500 hover:underline font-medium"
        >
          Continue Shopping
          <MoveRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
