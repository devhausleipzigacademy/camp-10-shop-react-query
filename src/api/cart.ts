import axios from "axios";

import { CartItem } from "../types/cart";

const API_URL = "http://localhost:3000";

export const getCart = async () => {
  const cart = await axios.get<CartItem[]>(`${API_URL}/cart`);
  return cart.data;
};

export const addToCart = async (cartItem: Omit<CartItem, "id">) => {
  const cart = await axios.post<CartItem>(`${API_URL}/cart`, { cartItem });
  return cart.data;
};

export const updateCart = async (cartItem: CartItem) => {
  const cart = await axios.patch<CartItem>(`${API_URL}/cart/${cartItem.id}`, {
    cartItem,
  });
  return cart.data;
};
