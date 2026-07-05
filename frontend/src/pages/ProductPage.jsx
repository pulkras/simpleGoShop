import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/api";

import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";

import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    async function fetchProduct() {
        try {
            const res = await api.get(`/products/${id}`);
            setProduct(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleAddToCart() {
        setAdding(true);

        addToCart({
            ...product,
            quantity: qty,
        });

        toast.success("Added to cart");

        setTimeout(() => setAdding(false), 300);
    }

    if (loading) return <Spinner />;

    if (!product) {
        return (
            <div className="text-center py-10">
                Product not found
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
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

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">
                    {product.title}
                </h1>

                <div className="text-xl text-gray-700">
                    ${product.price}
                </div>

                <p className="text-gray-600">
                    {product.description ||
                        "No description available"}
                </p>

                <div className="flex items-center gap-3">
                    <span>Quantity:</span>

                    <button
                        onClick={() =>
                            setQty((q) =>
                                Math.max(1, q - 1)
                            )
                        }
                        className="px-3 py-1 border rounded"
                    >
                        -
                    </button>

                    <span>{qty}</span>

                    <button
                        onClick={() => setQty((q) => q + 1)}
                        className="px-3 py-1 border rounded"
                    >
                        +
                    </button>
                </div>

                <div className="flex gap-3 mt-4">
                    <Button
                        onClick={handleAddToCart}
                        disabled={adding}
                    >
                        {adding
                            ? "Adding..."
                            : "Add to cart"}
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() => navigate("/cart")}
                    >
                        Go to cart
                    </Button>
                </div>
            </div>
        </div>
    );
}