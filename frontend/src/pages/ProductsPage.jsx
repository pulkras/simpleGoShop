import { useEffect, useState } from "react";
import { api } from "../api/api";
import ProductCard from "../components/product/ProductCard";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner />;
    }

    if (products.length === 0) {
        return (
            <EmptyState
                title="No products yet"
                description="Products will appear here once added"
            />
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Products
            </h1>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
}