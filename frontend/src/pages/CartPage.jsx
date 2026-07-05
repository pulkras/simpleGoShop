import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../api/orders";

import toast from "react-hot-toast";

export default function CartPage() {
    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
    } = useCart();

    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function handleCheckout() {
        if (!isAuth) {
            navigate("/login", {
                state: { from: { pathname: "/cart" } },
            });
            return;
        }

        if (cart.length === 0) return;

        setLoading(true);

        const items = cart.map((item) => ({
            product_id: item.id,
            qty: item.quantity,
            price: item.price,
        }));

        try {
            const res = await createOrder(items);

            toast.success(
                `Order #${res.order_id} created`
            );

            clearCart();
            navigate("/orders");
        } catch (err) {
            console.error(err);
            toast.error("Failed to create order");
        } finally {
            setLoading(false);
        }
    }

    if (cart.length === 0) {
        return (
            <EmptyState
                title="Your cart is empty"
                description="Start adding products to see them here"
                action={
                    <Button onClick={() => navigate("/")}>
                        Continue shopping
                    </Button>
                }
            />
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Cart</h1>

            <div className="space-y-4">
                {cart.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-lg p-4 flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-semibold">
                                {item.title}
                            </h2>

                            <p className="text-gray-600">
                                ${item.price} ×{" "}
                                {item.quantity}
                            </p>

                            <p className="font-medium">
                                Subtotal: $
                                {(
                                    item.price *
                                    item.quantity
                                ).toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                className="px-3 py-1 border rounded"
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity - 1
                                    )
                                }
                            >
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                                className="px-3 py-1 border rounded"
                                onClick={() =>
                                    updateQuantity(
                                        item.id,
                                        item.quantity + 1
                                    )
                                }
                            >
                                +
                            </button>

                            <Button
                                variant="danger"
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sticky bottom-0 border-t bg-white p-4 flex justify-between items-center shadow-md">
                <div>
                    <p className="text-lg font-bold">
                        Total: ${total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                        {cart.length} items
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={clearCart}
                    >
                        Clear
                    </Button>

                    <Button
                        onClick={handleCheckout}
                        disabled={loading}
                    >
                        {loading
                            ? "Processing..."
                            : "Checkout"}
                    </Button>
                </div>
            </div>
        </div>
    );
}