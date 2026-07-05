export default function Input({
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
}) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`border p-2 rounded w-full ${className}`}
        />
    );
}