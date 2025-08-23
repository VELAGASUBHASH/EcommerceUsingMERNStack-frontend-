import React, { useEffect, useState } from 'react';
import { ShoppingBagIcon, PlusIcon, BarChart2Icon } from 'lucide-react';
import { motion } from 'framer-motion';
import CreateProduct from '../Components/CreateProduct.jsx';
import ManageProduct from '../Components/ManageProduct.jsx';
import ProductAnalytics from '../Components/ProductAnalytics.jsx';
import UseProductStore from '../Store/UseProductStore.js';

const tabs = [
  { id: 'create', label: 'Create Product', icon: PlusIcon },
  { id: 'products', label: 'Products', icon: ShoppingBagIcon },
  { id: 'analytics', label: 'Analytics', icon: BarChart2Icon },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const {fetchAllProducts}=UseProductStore();

  useEffect(()=>{
    fetchAllProducts();
  },[fetchAllProducts]);

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.h1
          className="text-5xl font-semibold mb-12 text-center tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Admin Dashboard
        </motion.h1>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
              ${
                activeTab === tab.id
                  ? 'bg-white text-black shadow-md'
                  : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8 transition-all">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'create' && <CreateProduct />}
            {activeTab === 'products' && <ManageProduct />}
            {activeTab === 'analytics' && <ProductAnalytics />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
