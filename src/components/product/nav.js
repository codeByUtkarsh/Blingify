import React from "react";

const CategoryNav = ({ onCategoryClick }) => {
  return (
    <nav className="hidden md:flex flex-wrap space-x-4 mb-4 sm:mb-0">
      <button
        onClick={() => onCategoryClick("")}
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
      >
        All Products
      </button>
      <button
        onClick={() => onCategoryClick("electronics")}
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
      >
        Electronics
      </button>
      <button
        onClick={() => onCategoryClick("jewelery")}
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
      >
        Jewellery
      </button>
      <button
        onClick={() => onCategoryClick("men&apos;s clothing")}
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
      >
        Men&apos;s Clothing
      </button>
      <button
        onClick={() => onCategoryClick("women&apos;s clothing")}
        className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:text-blue-500 hover:border-blue-500 transition duration-300"
      >
        Women&apos;s Clothing
      </button>
    </nav>
  );
};

export default CategoryNav;
