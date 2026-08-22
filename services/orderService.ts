import { apiFetch } from "@/lib/api";

export interface OrderItemPayload {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  orderItems: OrderItemPayload[];
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod: string;
  totalPrice: number;
}

export interface Order {
  _id?: string;
  id?: string;
  createdAt?: string;
  totalPrice?: number;
  paymentMethod?: string;
  email?: string;
  user?: {
    email?: string;
    [key: string]: any;
  };
  status?: string;
  isPaid?: boolean;
  isDelivered?: boolean;
  orderItems?: any[];
  [key: string]: any;
}

export const createOrderApi = async (payload: CreateOrderPayload): Promise<any> => {
  return apiFetch<any>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const getOrderByIdApi = async (id: string): Promise<any> => {
  return apiFetch<any>(`/orders/${id}`);
};

export const getMyOrdersApi = async (): Promise<any[]> => {
  return apiFetch<any[]>("/orders/myorders");
};

