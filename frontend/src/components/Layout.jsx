import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
    const { itemsCount } = useCart();
    const { isAuth, isAdmin, logout } = useAuth();

    return (
        <div>
            <header className="border-b p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">

                    <Link to="/" className="font-bold text-2xl">
                        SimpleGoShop
                    </Link>

                    <nav className="flex gap-6 items-center">

                        <Link to="/">Products</Link>

                        <Link to="/cart">
                            Cart ({itemsCount})
                        </Link>

                        <Link to="/orders">
                            My Orders
                        </Link>

                        {isAdmin && (
                            <Link to="/admin">
                                Admin Panel
                            </Link>
                        )}

                        {!isAuth ? (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        ) : (
                            <button onClick={logout}>
                                Logout
                            </button>
                        )}

                    </nav>
                </div>
            </header>

            <main className="max-w-6xl mx-auto p-6">
                {children}
            </main>
        </div>
    );
}