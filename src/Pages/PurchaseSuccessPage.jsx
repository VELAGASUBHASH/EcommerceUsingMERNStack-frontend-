import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../Store/UseCartStore.js";
import axios from "../Library/Axios.js";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const [hasProcessed, setHasProcessed] = useState(false);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const { clearCart } = useCartStore();

  useEffect(() => {
    document.title = "Order Confirmation – Your Store";

    const sessionId = new URLSearchParams(window.location.search).get("session_id");

    if (!sessionId) {
      setIsProcessing(false);
      setError("No session ID found in the URL.");
      return;
    }

    if (hasProcessed) return;

    const handleCheckoutSuccess = async () => {
      try {
        const res = await axios.post("/payment/checkout-success", {
          sessionId,
        });

        clearCart();
        setOrderId(res.data.orderId);
        setHasProcessed(true);
      } catch (err) {
        console.error(err);
        setError("Failed to process payment.");
      } finally {
        setIsProcessing(false);
      }
    };

    handleCheckoutSuccess();
  }, [clearCart, hasProcessed]);

  if (isProcessing) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-medium text-neutral-800 dark:text-white">
        Processing your payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen bg-neutral-100 dark:bg-black flex items-center justify-center px-4 relative">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.08}
        numberOfPieces={700}
        recycle={false}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-neutral-900 shadow-xl p-8 md:p-10"
      >
        <div className="flex justify-center">
          <CheckCircle className="text-green-500 w-16 h-16 mb-6" />
        </div>

        <h1 className="text-3xl font-semibold text-center text-neutral-900 dark:text-white mb-4">
          Your Order Was Successful!
        </h1>

        <p className="text-center text-neutral-500 dark:text-neutral-400 mb-2">
          Thank you for shopping with us. We're getting your order ready to be shipped.
        </p>

        <p className="text-center text-sm text-green-500 mb-8">
          A confirmation email has been sent to you.
        </p>

        <div className="rounded-xl bg-neutral-100 dark:bg-neutral-800 px-6 py-4 mb-6 space-y-2 text-sm">
          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <span>Order Number</span>
            <span className="font-semibold text-neutral-900 dark:text-white">
              {orderId ? `#${orderId}` : "Loading..."}
            </span>
          </div>
          <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
            <span>Estimated Delivery</span>
            <span className="font-semibold text-neutral-900 dark:text-white">
              3–5 business days
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-black text-white dark:bg-white dark:text-black py-3 rounded-full font-medium transition"
          >
            <HandHeart className="inline mr-2" size={18} />
            Thanks for trusting us!
          </motion.button>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessPage;
