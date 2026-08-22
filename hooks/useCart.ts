import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartApi, addToCartApi, updateCartItemApi, removeFromCartApi } from "@/services/cartService";
import type { Cart } from "@/types/api";

export const CART_KEYS = {
  detail: ["cart"] as const,
};

export function useCart() {
  return useQuery<Cart, Error>({
    queryKey: CART_KEYS.detail,
    queryFn: getCartApi,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error, { productId: string; quantity?: number }>({
    mutationFn: ({ productId, quantity }) => addToCartApi(productId, quantity),
    onSuccess: (updatedCart) => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.detail });
      queryClient.setQueryData(CART_KEYS.detail, updatedCart);
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error, { productId: string; quantity: number }>({
    mutationFn: ({ productId, quantity }) => updateCartItemApi(productId, quantity),
    onSuccess: (updatedCart) => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.detail });
      queryClient.setQueryData(CART_KEYS.detail, updatedCart);
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation<Cart, Error, string>({
    mutationFn: removeFromCartApi,
    onSuccess: (updatedCart) => {
      queryClient.invalidateQueries({ queryKey: CART_KEYS.detail });
      queryClient.setQueryData(CART_KEYS.detail, updatedCart);
    },
  });
}
