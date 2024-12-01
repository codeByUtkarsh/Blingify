import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AddToCartButton({ product, cartItems, onAddToCart }) {
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  return (
    <button
      onClick={onAddToCart}
      className="bg-gradient-to-r from-green-200 via-blue-800 to-blue-400 text-white font-normal px-4 py-2 rounded-full transition-transform duration-300 hover:bg-gradient-to-r hover:from-green-300 hover:via-blue-400 hover:to-blue-500 hover:-translate-y-1 active:translate-y-0 shadow-lg hover:shadow-xl"
      style={{
        background: "linear-gradient(to right, #a0eac4, #7fd1f7, #57c1eb)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        border: "none",
      }}
    >
      {isProductInCart ? (
        <Link href="/cart">
          <span className="flex items-center">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </Link>
      ) : (
        <FontAwesomeIcon icon={faShoppingCart} />
      )}
    </button>
  );
}
