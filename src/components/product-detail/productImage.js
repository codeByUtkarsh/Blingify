
import "@/app/globals.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductImage({ product }) {
  return (
    <div className="image-container">
      <Zoom>
        <img src={product.image} alt={product.title} className="rounded-lg object-cover" />
      </Zoom>
    </div>
  );
}
