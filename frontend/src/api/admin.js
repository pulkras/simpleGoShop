import { api } from "./api";

export async function getProducts() {
    const res = await api.get("/products");
    return res.data;
}

export async function createProduct(product) {
    const res = await api.post("/admin/products", product);
    return res.data;
}

export async function updateProduct(id, product) {
    const res = await api.put(`/admin/products/${id}`, product);
    return res.data;
}

export async function deleteProduct(id) {
    const res = await api.delete(`/admin/products/${id}`);
    return res.data;
}