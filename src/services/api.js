import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1/products";

export const getProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const url = params ? `${BASE_URL}?${params}` : BASE_URL;

  const response = await axios.get(url);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(BASE_URL, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${BASE_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
