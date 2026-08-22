import { apiFetch } from "@/lib/api";

export interface CreateRazorpayOrderPayload {
  amount: number;
  currency?: string;
  receipt?: string;
}

export interface VerifyRazorpayPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}

export interface RazorpayOrderResponse {
  id?: string;
  amount?: number;
  currency?: string;
  receipt?: string;
  status?: string;
  [key: string]: any;
}

export const createRazorpayOrderApi = async (payload: CreateRazorpayOrderPayload): Promise<RazorpayOrderResponse> => {
  return apiFetch<RazorpayOrderResponse>("/payment/razorpay-order", {
    method: "POST",
    body: JSON.stringify({
      amount: payload.amount,
      currency: payload.currency || "INR",
      receipt: payload.receipt || `receipt_${Date.now()}`,
    }),
  });
};

export const verifyRazorpayPaymentApi = async (payload: VerifyRazorpayPaymentPayload): Promise<any> => {
  return apiFetch<any>("/payment/razorpay-verify", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
