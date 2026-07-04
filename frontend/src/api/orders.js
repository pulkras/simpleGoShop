import { api } from "./api";

export const createOrder = async (items) => {
  const res = await api.post("/orders", items);
  return res.data;
};