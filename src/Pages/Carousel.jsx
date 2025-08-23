import React, { useState, useEffect } from 'react';

const Carousel = ({ images = [] }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const goToSlide = (index) => {
    if (index < 0) {
      setCurrent(length - 1);
    } else if (index >= length) {
      setCurrent(0);
    } else {
      setCurrent(index);
    }
  };

  return (
    <div className="relative mx-auto mt-6 w-[95%] max-w-6xl h-[40vh] md:h-[60vh] overflow-hidden rounded-xl shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center bg-black"
          >
            <img
              src={img.url}
              alt={img.alt || `Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={() => goToSlide(current - 1)}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 text-black font-bold py-2 px-4 rounded-full shadow-md transition"
        aria-label="Previous Slide"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={() => goToSlide(current + 1)}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-80 text-black font-bold py-2 px-4 rounded-full shadow-md transition"
        aria-label="Next Slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
