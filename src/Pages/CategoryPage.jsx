import React, { useEffect } from 'react';
import UseProductStore from '../Store/UseProductStore.js';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../Components/ProductCard.jsx';

const CategoryPage = () => {
  const { fetchProductByCategory, products } = UseProductStore();
  const { category } = useParams();

  useEffect(() => {
    fetchProductByCategory(category);
  }, [fetchProductByCategory, category]);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        {/* Category Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-semibold text-neutral-900 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {products?.length === 0 ? (
            <h2 className="text-2xl font-medium text-neutral-500 text-center col-span-full">
              No products found.
            </h2>
          ) : (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
