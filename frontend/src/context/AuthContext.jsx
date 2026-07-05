import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // load token on start
    useEffect(() => {
        const saved = localStorage.getItem(TOKEN_KEY);

        if (saved) {
            setToken(saved);

            try {
                const decoded = jwtDecode(saved);
                setUser(decoded);
            } catch (err) {
                console.error("Invalid token");
                setToken(null);
                setUser(null);
            }
        }
    }, []);

    // persist token
    useEffect(() => {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);

            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch {
                setUser(null);
            }
        } else {
            localStorage.removeItem(TOKEN_KEY);
            setUser(null);
        }
    }, [token]);

    async function login(email, password) {
        const res = await fetch(
            "http://localhost:8080/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!res.ok) {
            throw new Error("Login failed");
        }

        const data = await res.json();

        setToken(data.token);

        // сразу декодируем
        try {
            const decoded = jwtDecode(data.token);
            setUser(decoded);
        } catch {
            setUser(null);
        }

        return data.token;
    }

    async function register(email, password) {
        const res = await fetch(
            "http://localhost:8080/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!res.ok) {
            throw new Error("Register failed");
        }

        return await res.json();
    }

    function logout() {
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token,
                user,

                login,
                register,
                logout,

                isAuth: !!token,
                isAdmin: user?.role === "admin",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}