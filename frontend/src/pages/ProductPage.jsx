import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
    const { id } = useParams();

    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [id]);

    async function loadProduct() {
        try {
            const data = await getProduct(id);
            setProduct(data);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="border rounded-lg h-80 flex items-center justify-center">
                Image Placeholder
            </div>

            <div>
                <h1 className="text-3xl font-bold">
                    {product.title}
                </h1>

                <p className="mt-4 text-gray-600">
                    {product.description}
                </p>

                <div className="mt-6 text-2xl font-semibold">
                    ${product.price}
                </div>

                <div className="mt-2 text-sm text-gray-500">
                    Stock: {product.stock}
                </div>

                <button
                    onClick={() => addToCart(product)}
                    className="mt-6 bg-black text-white px-4 py-2 rounded"
                >
                    Add to cart
                </button>
            </div>
        </div>
    );
}