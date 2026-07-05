import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function OrdersPage() {
    const { token } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const res = await fetch("http://localhost:8080/api/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (!token) {
        return <div>Please login to see your orders</div>;
    }

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (orders.length === 0) {
        return <div>No orders yet</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                My Orders
            </h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div
                        key={order.order_id}
                        className="border p-4 rounded"
                    >
                        <h2 className="font-bold">
                            Order #{order.order_id}
                        </h2>

                        <div className="mt-2 space-y-2">
                            {order.items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between border-b py-1"
                                >
                                    <span>
                                        {item.title}
                                    </span>

                                    <span>
                                        {item.qty} × ${item.price}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}