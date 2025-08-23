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
  const {fetchFeatutedProducts,products}= UseProductStore();

  useEffect(()=>{
    fetchFeatutedProducts();
  },[fetchFeatutedProducts])
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
      <section className="pt-6">
        <Carousel images={carouselImages} />
      </section>

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
        {products.length>0 && <FeaturedProducts featuredProducts={products}/>}
      </section>
    </div>
  );
};

export default HomePage;
