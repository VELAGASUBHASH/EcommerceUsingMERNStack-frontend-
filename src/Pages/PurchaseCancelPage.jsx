import { XCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PurchaseCancelPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-500 w-16 h-16" />
        </div>

        <h1 className="text-3xl font-bold text-red-400 mb-2">Payment Canceled</h1>
        <p className="text-gray-300 mb-2">Your payment was not completed.</p>
        <p className="text-sm text-red-300 mb-6">Please try again or contact support if the issue persists.</p>

        <Link
          to="/cart"
          className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-300"
        >
          <ArrowLeft className="mr-2" size={18} />
          Return to Cart
        </Link>
      </motion.div>
    </div>
  );
};

export default PurchaseCancelPage;
