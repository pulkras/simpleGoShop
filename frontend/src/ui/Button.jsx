export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
}) {
    const base =
        "px-4 py-2 rounded font-medium transition";

    const styles = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${base} ${styles[variant]} ${className}`}
        >
            {children}
        </button>
    );
}