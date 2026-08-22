import { apiFetch } from "@/lib/api";
import type { Cart } from "@/types/api";

export const getCartApi = async (): Promise<Cart> => {
  return apiFetch<Cart>("/cart");
};

export const addToCartApi = async (productId: string, quantity: number = 1): Promise<Cart> => {
  return apiFetch<Cart>("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

export const updateCartItemApi = async (productId: string, quantity: number): Promise<Cart> => {
  return apiFetch<Cart>(`/cart/${productId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
};

export const removeFromCartApi = async (productId: string): Promise<Cart> => {
  return apiFetch<Cart>(`/cart/${productId}`, {
    method: "DELETE",
  });
};
