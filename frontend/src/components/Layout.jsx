import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

export default function Layout({ children }) {
    const { itemsCount } = useCart();

    return (
        <div>
            <header className="border-b p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link
                        to="/"
                        className="font-bold text-2xl"
                    >
                        SimpleGoShop
                    </Link>

                    <nav className="flex gap-6">
                        <Link to="/">
                            Products
                        </Link>

                        <Link to="/cart">
                            Cart ({itemsCount})
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">
                {children}
            </main>
        </div>
    );
}