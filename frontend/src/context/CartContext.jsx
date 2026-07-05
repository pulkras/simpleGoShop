import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            setCart(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    function addToCart(product) {
    setCart((prev) => {
        const existing = prev.find(
            (p) => p.id === product.id
        );

        if (existing) {
            return prev.map((p) =>
                p.id === product.id
                    ? {
                          ...p,
                          quantity:
                              p.quantity +
                              (product.quantity || 1),
                      }
                    : p
            );
        }

        return [
            ...prev,
            {
                ...product,
                quantity: product.quantity || 1,
            },
        ];
    });
    }

    function removeFromCart(id) {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    function updateQuantity(id, qty) {
    setCart((prev) =>
        prev
            .map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: Math.max(1, qty),
                      }
                    : item
            )
            .filter((item) => item.quantity > 0)
    );
}

    function clearCart() {
        setCart([]);
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const itemsCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total,
                itemsCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}