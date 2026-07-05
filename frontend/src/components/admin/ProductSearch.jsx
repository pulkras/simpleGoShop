export default function ProductSearch({
    value,
    onChange,
}) {
    return (
        <input
            className="border rounded p-2 w-full"
            placeholder="Search products..."
            value={value}
            onChange={(e) =>
                onChange(e.target.value)
            }
        />
    );
}