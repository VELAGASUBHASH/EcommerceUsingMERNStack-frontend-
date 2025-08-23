import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import axios from '../Library/Axios.js';
import toast from 'react-hot-toast';

const PeopleAlsoBought = () => {
  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const res = await axios.get("/products/recommendations");
        setRecommendation(res.data);
      } catch (error) {
        toast.error("Unable to fetch recommendations");
      }
    };
    fetchRecommendation();
  }, []);

  if (recommendation.length === 0) return null;

  return (
    <section className="mt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-semibold text-gray-900 text-center mb-10 tracking-tight">
          People Also Bought
        </h3>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recommendation.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PeopleAlsoBought;
