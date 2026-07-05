import { useNavigate } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        <Card className="flex flex-col gap-3">
            {/* IMAGE */}
            <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-full object-cover rounded"
                    />
                ) : (
                    <span className="text-gray-400">
                        No image
                    </span>
                )}
            </div>

            {/* TITLE */}
            <h2 className="font-semibold text-lg">
                {product.title}
            </h2>

            {/* PRICE */}
            <div className="text-gray-700">
                ${product.price}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-auto">
                <Button
                    variant="secondary"
                    onClick={() =>
                        navigate(`/product/${product.id}`)
                    }
                >
                    View
                </Button>

                <Button
                    onClick={() =>
                        addToCart(product)
                    }
                >
                    Add to cart
                </Button>
            </div>
        </Card>
    );
}