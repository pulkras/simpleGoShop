export default function ProductEditor({ form, setForm, onSave }) {

    function update(field, value) {
        setForm(prev => ({
            ...prev,
            [field]: value
        }));
    }

    return (
        <div className="space-y-3">

            <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="border p-2 w-full"
            />

            <input
                placeholder="Description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="border p-2 w-full"
            />

            <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => update("price", Number(e.target.value))}
                className="border p-2 w-full"
            />

            <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) => update("stock", Number(e.target.value))}
                className="border p-2 w-full"
            />

            <button
                onClick={onSave}
                className="bg-black text-white px-4 py-2"
            >
                Save
            </button>
        </div>
    );
}