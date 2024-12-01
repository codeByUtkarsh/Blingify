export default function QuantitySelector({ quantity, onQuantityChange }) {
    return (
      <div>
        <label className="block mt-4 text-muted-foreground">Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => onQuantityChange(Math.max(1, e.target.value))}
          className="mt-2 p-2 border border-border rounded-md w-16"
          aria-label="Select quantity"
        />
      </div>
    );
  }
  