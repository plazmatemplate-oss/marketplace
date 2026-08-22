import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrderApi, getOrderByIdApi, getMyOrdersApi, type CreateOrderPayload } from "@/services/orderService";

export const ORDER_KEYS = {
  myOrders: ["orders", "myorders"] as const,
  detail: (id: string) => ["orders", id] as const,
};

export function useCreateOrder() {
  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrderApi(payload),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ORDER_KEYS.detail(id),
    queryFn: () => getOrderByIdApi(id),
    enabled: !!id,
  });
}

export function useMyOrders() {
  return useQuery({
    queryKey: ORDER_KEYS.myOrders,
    queryFn: getMyOrdersApi,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
}
