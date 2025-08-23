import { motion } from "framer-motion";
import { Trash2, Star } from "lucide-react";
import UseProductStore from "../Store/UseProductStore.js";
import { Toaster } from "react-hot-toast";

const ManageProduct = () => {
  const { deleteProduct, toggleFeaturedProduct, products } = UseProductStore();

  const handleDelete = async (id) => {
    await deleteProduct(id);
  };

  const handleToggleFeatured = async (id) => {
    await toggleFeaturedProduct(id);
  };

  return (
    <>
      <Toaster position="top-center" />

      <motion.div
        className="bg-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden max-w-6xl mx-auto mt-16 border border-gray-200 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="min-w-full divide-y divide-gray-100 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Product", "Price", "Category", "Featured", "Actions"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="px-6 py-5 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products?.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img
                      className="h-12 w-12 rounded-lg object-cover shadow-sm ring-1 ring-gray-200"
                      src={product.image}
                      alt={product.name}
                    />
                    <span className="font-medium text-gray-900">
                      {product.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  ${product.price?.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleFeatured(product._id)}
                    className={`p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      product.isFeatured
                        ? "bg-yellow-400 text-white hover:bg-yellow-300 focus:ring-yellow-400"
                        : "bg-gray-200 text-gray-600 hover:bg-yellow-100 focus:ring-gray-300"
                    }`}
                    aria-label="Toggle Featured"
                  >
                    <Star className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-500 hover:text-red-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full p-1"
                    aria-label="Delete Product"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </>
  );
};

export default ManageProduct;
