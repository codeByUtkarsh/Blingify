"use client";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/slices/productSlice";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "@/services/productService";
import ProductCard from "@/components/product/productCard";
import SortBy from "@/components/product/SortBy";
import SearchBar from "@/components/home/SearchBar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/product/nav"; // Import CategoryNav
import "@/app/globals.css";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [sortOption, setSortOption] = useState("popularity");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const [isLoading, setIsLoading] = useState(false);

  // Define loadProducts using useCallback to memoize it
  const loadProducts = useCallback(
    async (selectedCategory = "") => {
      setIsLoading(true);
      setCategory(selectedCategory);
      let fetchedProducts;

      if (selectedCategory) {
        fetchedProducts = await fetchProductsByCategory(selectedCategory);
      } else {
        fetchedProducts = await fetchProducts();
      }
      dispatch(setProducts(fetchedProducts));
      setIsLoading(false);
    },
    [dispatch]
  );

  useEffect(() => {
    loadProducts(category);
  }, [category, loadProducts]); // Add loadProducts as a dependency

  useEffect(() => {
    const pageTitle = searchTerm
      ? `Search results for "${searchTerm}" - Best Deals`
      : category
      ? `${category.charAt(0).toUpperCase() + category.slice(1)} - Best Deals`
      : "Home - Best Deals on Electronics, Clothing, and More";
    document.title = pageTitle;
  }, [category, searchTerm]);

  const handleCategoryClick = (selectedCategory) => {
    setSearchTerm("");
    setCurrentPage(1);
    loadProducts(selectedCategory);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getFilteredProducts = () => {
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getSortedProducts = (filteredProducts) => {
    const sortedProducts = [...filteredProducts];
    switch (sortOption) {
      case "priceLowToHigh":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "priceHighToLow":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "aToZ":
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      case "zToA":
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      case "popularity":
      default:
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }
  };

  const filteredProducts = getFilteredProducts();
  const sortedProducts = getSortedProducts(filteredProducts);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
          }`}
        >
          &lt;
        </button>
        {pageNumbers.map((number) => {
          if (
            number === 1 ||
            number === totalPages ||
            (number >= currentPage - 1 && number <= currentPage + 1)
          ) {
            return (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded ${
                  number === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {number}
              </button>
            );
          } else if (number === currentPage - 2 || number === currentPage + 2) {
            return <span key={number}>...</span>;
          }
          return null;
        })}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200"
          }`}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="pt-28 px-4 pb-16 min-h-screen">
        <div className="fixed top-16 left-0 right-0 z-40 flex flex-wrap justify-between items-center bg-white px-6 py-4 shadow-md">
          <CategoryNav onCategoryClick={handleCategoryClick} />
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <SearchBar onSearch={handleSearch} />
            <SortBy onSortChange={handleSortChange} />
          </div>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center min-h-screen absolute top-0 left-0 right-0">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-gray-700">Loading products...</p>
          </div>
        )}
        {!isLoading && (
          <div className="mt-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {paginatedProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">
                  No products found.
                </p>
              )}
            </div>
            <div className="flex justify-center mt-10">
              {renderPagination()}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
