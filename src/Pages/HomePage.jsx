import React, { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';
import CategoryItem from '../Components/CategoryItem.jsx';
import UseProductStore from '../Store/UseProductStore.js';
import FeaturedProducts from '../Components/FeaturedProducts.jsx';

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
];

const HomePage = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const { fetchFeatutedProducts, products } = UseProductStore();

  // State for popup
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    fetchFeatutedProducts();
  }, [fetchFeatutedProducts]);

  useEffect(() => {
    const fetchImages = async () => {
      const data = [
        { url: 'silde1.jpg', alt: 'First Slide' },
        { url: 'silde2.jpg', alt: 'Second Slide' },
        { url: 'silde3.jpg', alt: 'Third Slide' },
      ];
      setCarouselImages(data);
    };
    fetchImages();
  }, []);

  return (
    <div className="bg-[#f5f5f7] text-gray-900 min-h-screen font-sans">
      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              ⚠️ Payment System Notice
            </h2>
            <p className="text-gray-700 mb-4">
              Payment success is currently <span className="font-bold">not working</span> and is under maintenance.  
              We’ll sort this out shortly.  
              If you have an issue, please contact support in the chatbot below.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Carousel */}
      <section className="pt-6">
        <Carousel images={carouselImages} />
      </section>

      {/* Categories */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
          Explore Our Categories
        </h2>
        <p className="text-center text-lg text-gray-500 mb-12 max-w-xl mx-auto">
          Discover sustainable fashion crafted for modern living.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map(category => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>

        {products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
