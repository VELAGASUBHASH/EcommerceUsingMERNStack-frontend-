import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
  return (
    <Link
      to={"/category"+category.href}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="h-60 overflow-hidden">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl font-medium group-hover:text-gray-700 transition">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
