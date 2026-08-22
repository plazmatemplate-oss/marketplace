"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SectionTitle from "@/components/common/SectionTitle";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useOrder } from "@/hooks/useOrders";

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data: orderData, isLoading } = useOrder(orderId);

  // orderData can be { success: true, data: { ... } } or order object directly
  const order = (orderData as any)?.data || orderData || null;

  const formattedDate = order?.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const displayOrderId = order?._id || orderId || "PT-9824";
  const totalPrice = typeof order?.totalPrice === "number" ? order.totalPrice : 0;
  const paymentMethod = order?.paymentMethod || "Razorpay";
  const userEmail = order?.email || order?.user?.email || "your registered email address";

  if (isLoading && orderId) {
    return (
      <div className="max-w-3xl mx-auto page-card flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <p className="text-theme-gray-500 text-sm">Fetching order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto page-card flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-green-600" />
      </div>

      <SectionTitle
        title="Thank you for your order!"
        align="center"
        as="h1"
        uppercase={false}
        className="mb-4"
      />

      <p className="text-theme-gray-600 text-[15px] leading-relaxed max-w-lg mt-4">
        Your order <span className="font-bold text-theme-dark-blue">#{displayOrderId}</span> has been successfully placed. We have sent a confirmation email to <span className="font-semibold text-theme-dark-blue">{userEmail}</span> with the order details.
      </p>

      <div className="bg-theme-gray-50 border border-theme-gray-100 rounded-sm w-full p-6 mt-8 flex flex-col sm:flex-row justify-between text-left gap-4">
        <div>
          <p className="text-[12px] text-theme-gray-500 uppercase tracking-wide font-bold mb-1">Order ID</p>
          <p className="text-[14px] text-theme-gray-800 font-semibold truncate max-w-[180px]">{displayOrderId}</p>
        </div>
        <div>
          <p className="text-[12px] text-theme-gray-500 uppercase tracking-wide font-bold mb-1">Date</p>
          <p className="text-[14px] text-theme-gray-800 font-semibold">{formattedDate}</p>
        </div>
        <div>
          <p className="text-[12px] text-theme-gray-500 uppercase tracking-wide font-bold mb-1">Total</p>
          <p className="text-[14px] text-theme-gray-800 font-semibold">€{totalPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-[12px] text-theme-gray-500 uppercase tracking-wide font-bold mb-1">Payment Method</p>
          <p className="text-[14px] text-theme-gray-800 font-semibold">{paymentMethod}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
        <Link href="/order-history">
          <Button variant="outline" className="w-full sm:w-auto h-12 px-8 text-[14px] font-bold tracking-wide uppercase border-theme-gray-200 cursor-pointer">
            View Order History
          </Button>
        </Link>
        <Link href="/">
          <Button className="w-full sm:w-auto h-12 px-8 text-[14px] font-bold tracking-wide uppercase bg-(image:--theme-background-gradiant) border-0 hover:opacity-90 shadow-md cursor-pointer">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
