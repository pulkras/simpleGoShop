import { createOrder } from "../api/orders";

import { useCart } from "../context/CartContext";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CartPage() {

    const navigate = useNavigate();

    const { isAuth } = useAuth();

    const {
        cart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
    } = useCart();

    async function handleCheckout() {

        if (!isAuth) {
            navigate("/login", {
                state: {
                    from: {
                        pathname: "/cart",
                    },
                },
            });

            return;
        }
        if (cart.length === 0) return;

        const items = cart.map((item) => ({
            product_id: item.id,
            qty: item.quantity,
            price: item.price,
        }));

        try {
            const res = await createOrder(items);

            alert(`Order #${res.order_id} created`);

            clearCart();
        } catch (err) {
            console.error(err);

            alert("Failed to create order");
        }
    }

    if (cart.length === 0) {
        return (
            <>
                <h1 className="text-2xl font-bold mb-4">
                    Cart
                </h1>

                <p>Cart is empty.</p>
            </>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Cart
            </h1>

            {cart.map((item) => (
                <div
                    key={item.id}
                    className="border rounded-lg p-4 mb-4 flex justify-between items-center"
                >
                    <div>
                        <h2 className="font-semibold">
                            {item.title}
                        </h2>

                        <p>${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                                updateQuantity(
                                    item.id,
                                    Number(e.target.value)
                                )
                            }
                            className="border w-16 p-1"
                        />

                        <button
                            onClick={() =>
                                removeFromCart(item.id)
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <h2 className="text-xl font-bold mb-4">
                Total: ${total.toFixed(2)}
            </h2>

            <div className="flex gap-3">
                <button
                    onClick={handleCheckout}
                    className="bg-black text-white px-5 py-2 rounded"
                >
                    Checkout
                </button>

                <button
                    onClick={clearCart}
                    className="bg-red-500 text-white px-5 py-2 rounded"
                >
                    Clear cart
                </button>
            </div>
        </div>
    );
}