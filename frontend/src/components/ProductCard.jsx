import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="border rounded-lg p-4 shadow-sm hover:shadow-md transition block"
    >
      <h2 className="text-lg font-bold">{product.title}</h2>

      <p className="text-gray-600 mt-2 line-clamp-2">
        {product.description || "No description"}
      </p>

      <div className="mt-3 flex justify-between">
        <span className="font-semibold">${product.price}</span>
        <span className="text-sm text-gray-500">
          Stock: {product.stock}
        </span>
      </div>
    </Link>
  );
}