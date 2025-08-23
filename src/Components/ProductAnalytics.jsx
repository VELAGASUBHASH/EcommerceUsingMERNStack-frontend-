import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../Library/Axios.js";
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ProductAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-400">Loading analytics...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
        />
        <AnalyticsCard
          title="Total Products"
          value={analyticsData.products.toLocaleString()}
          icon={Package}
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${analyticsData.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
        />
      </div>

      {/* Chart */}
      <motion.div
        className="rounded-2xl bg-white p-6 shadow-xl border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h2 className="text-gray-800 text-xl font-semibold mb-4">Sales & Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#CBD5E1" />
            <XAxis dataKey="name" stroke="#4B5563" />
            <YAxis yAxisId="left" stroke="#4B5563" />
            <YAxis yAxisId="right" orientation="right" stroke="#4B5563" />
            <Tooltip
              contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "8px", border: "1px solid #e5e7eb" }}
              labelStyle={{ color: "#4B5563" }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              strokeWidth={2.5}
              activeDot={{ r: 8 }}
              name="Sales"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={2.5}
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default ProductAnalytics;

// Apple-style Card Component
const AnalyticsCard = ({ title, value, icon: Icon }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition duration-300"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div>
      <p className="text-gray-500 font-medium text-sm">{title}</p>
      <h3 className="text-gray-900 font-bold text-3xl mt-1">{value}</h3>
    </div>
    <Icon className="w-10 h-10 text-gray-300" />
  </motion.div>
);
