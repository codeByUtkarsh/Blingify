import Image from "next/image";
import "@/app/globals.css";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductImage({ product }) {
  return (
    <div className="image-container">
      <Zoom>
        <Image
          src={product.image}
          alt={product.title}
          className="rounded-lg object-cover"
          width={500}
          height={500}
          quality={75}
        />
      </Zoom>
    </div>
  );
}
