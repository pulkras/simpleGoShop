import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ProductSearch from "../components/admin/ProductSearch";
import ProductTable from "../components/admin/ProductTable";
import ProductEditor from "../components/admin/ProductEditor";
import ConfirmDialog from "../components/admin/ConfirmDialog";

import { api } from "../api/api";
import {
    createProduct,
    updateProduct,
    deleteProduct,
} from "../api/admin";

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const [editing, setEditing] = useState(null);
    const [showConfirm, setShowConfirm] = useState(null);

    const [form, setForm] = useState({
        title: "",
        price: "",
        description: "",
        image_url: "",
    });

    useEffect(() => {
        load();
    }, []);

    async function load() {
        const res = await api.get("/products");
        setProducts(res.data);
    }

    const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    function startEdit(product) {
        setEditing(product);
        setForm(product);
    }

    function resetForm() {
        setEditing(null);
        setForm({
            title: "",
            price: "",
            description: "",
            image_url: "",
        });
    }

    async function handleSave() {
        try {
            if (editing) {
                await updateProduct(editing.id, form);
                toast.success("Updated");
            } else {
                await createProduct(form);
                toast.success("Created");
            }

            resetForm();
            load();
        } catch {
            toast.error("Error");
        }
    }

    async function handleDelete() {
        try {
            await deleteProduct(showConfirm.id);
            toast.success("Deleted");
            setShowConfirm(null);
            load();
        } catch {
            toast.error("Delete failed");
        }
    }

    return (
        <div className="grid grid-cols-2 gap-10">

            <div>
                <ProductEditor
                    product={editing}
                    form={form}
                    setForm={setForm}
                    onSave={handleSave}
                />
            </div>

            <div>
                <ProductSearch
                    value={search}
                    onChange={setSearch}
                />

                <ProductTable
                    products={filtered}
                    onEdit={startEdit}
                    onDelete={(p) =>
                        setShowConfirm(p)
                    }
                />
            </div>

            {showConfirm && (
                <ConfirmDialog
                    title="Delete product?"
                    text={showConfirm.title}
                    onCancel={() => setShowConfirm(null)}
                    onConfirm={handleDelete}
                />
            )}
        </div>
    );
}