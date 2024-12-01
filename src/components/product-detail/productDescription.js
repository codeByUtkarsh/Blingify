export default function ProductDescription({ product }) {
    return (
      <>
        <h1 className="text-2xl font-bold text-foreground">{product.title}</h1>
        <p className="text-lg text-muted-foreground">{product.category}</p>
        <p className="text-xl font-semibold text-primary">$ {product.price}</p>
        <p className="text-sm text-muted-foreground">MRP Incl. of all taxes</p>
        {product.category.includes("clothing") && (
          <>
            <label className="block mt-4 text-muted-foreground">Please select a size:</label>
            <select className="mt-2 p-2 border border-border rounded-md" aria-label="Select size">
              {["XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <option key={size}>{size}</option>
              ))}
            </select>
          </>
        )}
        <h2 className="mt-6 font-semibold text-lg">Product Description</h2>
        <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
      </>
    );
  }
  