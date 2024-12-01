"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "@/app/globals.css";
import Head from "next/head";
import ProductImage from "@/components/product-detail/productImage";
import ProductDescription from "@/components/product-detail/productDescription";
import QuantitySelector from "@/components/product-detail/quantity";
import PincodeChecker from "@/components/product-detail/pincode";
import AddToCartButton from "@/components/product-detail/addToCart";
import { fetchProductById } from "@/services/productService";
import { addToCart } from "@/redux/slices/cartSlice";
import NotFound from "@/app/not-found";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || {};
    setQuantity(storedQuantities[id] || 1);
  }, [id]);

  const handleQuantityChange = (value) => {
    setQuantity(value);
    const storedQuantities = JSON.parse(localStorage.getItem("quantities")) || {};
    storedQuantities[id] = value;
    localStorage.setItem("quantities", JSON.stringify(storedQuantities));
  };

  const handleAddToCart = () => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    if (!isProductInCart) {
      dispatch(addToCart({ ...product, quantity }));
      toast.dark(`${product.title} added to cart!`);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <NotFound/>

  return (
    <>
      <Head>
        <title>{product.title} - Shop Now</title>
      </Head>
      <div className="product-container">
        <ProductImage product={product} />
        <div className="description-section">
          <ProductDescription product={product} />
          <QuantitySelector
    quantity={quantity}
    onQuantityChange={handleQuantityChange}
    className="quantity-selector"  // Added class for custom styling
  />
  <AddToCartButton
    product={product}
    cartItems={cartItems}
    onAddToCart={handleAddToCart}
    className="add-to-cart-button" // Added class for custom styling
  />
          <PincodeChecker />
        </div>
      </div>
    </>
  );
}










