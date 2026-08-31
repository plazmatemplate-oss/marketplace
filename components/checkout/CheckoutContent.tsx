"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useUserProfile } from "@/hooks/useAuth";
import { useCoupon } from "@/hooks/useCoupon";
import CouponBox from "@/components/common/CouponBox";
import { getImageUrl } from "@/lib/utils";
import type { CartItem } from "@/types/api";
import { ShoppingBag, Loader2 } from "lucide-react";

export default function CheckoutContent() {
  const { data: cart, isLoading: isCartLoading } = useCart();
  const { isLoading: isProfileLoading } = useUserProfile();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const rawItems: CartItem[] = cart?.cartItems || cart?.items || [];

  const subtotal = rawItems.reduce((acc: number, item: CartItem) => {
    const prod = typeof item.book === "object" ? item.book : typeof item.product === "object" ? item.product : null;
    const price = typeof prod?.price === "number" ? prod.price : 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const couponProps = useCoupon(subtotal);

  if (!token) {
    return (
      <div className="bg-white p-12 shadow-sm border border-theme-gray-100 rounded-lg text-center flex flex-col items-center justify-center max-w-md mx-auto my-12">
        <ShoppingBag className="w-16 h-16 text-theme-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-theme-gray-800 mb-2">Please Sign In</h2>
        <p className="text-sm text-theme-gray-500 mb-6">You need to be signed in to proceed to checkout.</p>
        <Link href="/login" className="w-full">
          <Button className="w-full h-11 text-sm font-bold bg-(image:--theme-background-gradiant) border-0 shadow-md">
            Sign In to Account
          </Button>
        </Link>
      </div>
    );
  }

  if (isCartLoading || isProfileLoading) {
    return (
      <div className="py-24 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (rawItems.length === 0) {
    return (
      <div className="bg-white p-12 shadow-sm border border-theme-gray-100 rounded-lg text-center flex flex-col items-center justify-center max-w-md mx-auto my-12">
        <ShoppingBag className="w-16 h-16 text-theme-gray-300 mb-4" />
        <h2 className="text-xl font-bold text-theme-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-theme-gray-500 mb-6">Add items to your cart before proceeding to checkout.</p>
        <Link href="/modules" className="w-full">
          <Button className="w-full h-11 text-sm font-bold bg-(image:--theme-background-gradiant) border-0 shadow-md">
            Explore Themes & Modules
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-8">
      {/* Sidebar: In Your Cart */}
      <div className="w-full lg:w-1/3">
        <div className="bg-white p-6 sm:p-8 shadow-sm border border-theme-gray-100 rounded-lg flex flex-col gap-6 sticky top-32">
          <div className="flex justify-between items-center border-b border-theme-gray-100 pb-4">
            <h2 className="text-[18px] font-bold text-theme-dark-blue">In your cart</h2>
            <span className="text-[12px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {rawItems.reduce((sum, item) => sum + (item.quantity || 1), 0)} items
            </span>
          </div>

          <div className="flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-1">
            {rawItems.map((item: CartItem, idx: number) => {
              const prod = typeof item.book === "object" ? item.book : typeof item.product === "object" ? item.product : null;
              const prodId = prod?._id || (typeof item.book === "string" ? item.book : typeof item.product === "string" ? item.product : "");
              const title = prod?.title || "Product Item";
              const priceNum = typeof prod?.price === "number" ? prod.price : 0;
              const imgUrl = getImageUrl(prod?.images?.[0]);
              const qty = item.quantity || 1;

              return (
                <div key={prodId || idx} className="flex gap-4 items-center border-b border-theme-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="w-16 h-16 bg-theme-gray-50 border border-theme-gray-100 rounded relative shrink-0 overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={title}
                      fill
                      unoptimized
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-theme-dark-blue line-clamp-2 leading-tight">
                      {title}
                    </span>
                    <div className="flex items-center gap-2 text-[12px] text-theme-gray-500 mt-1">
                      <span className="font-medium text-theme-gray-700">€{priceNum.toFixed(2)}</span>
                      <span>•</span>
                      <span>Qty: {qty}</span>
                    </div>
                  </div>
                  <div className="text-[14px] font-bold text-theme-gray-800 shrink-0">
                    €{(priceNum * qty).toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 text-[14.5px] text-theme-gray-600 border-t border-theme-gray-100 pt-4">
            <div className="flex justify-between items-center">
              <span>Subtotal</span>
              <span className="font-semibold text-theme-gray-800">€{subtotal.toFixed(2)}</span>
            </div>

            {couponProps.appliedCoupon && (
              <div className="flex justify-between items-center text-emerald-600 font-semibold text-[14px]">
                <span>Discount ({couponProps.appliedCoupon.code})</span>
                <span>-€{couponProps.discountAmount.toFixed(2)}</span>
              </div>
            )}
          </div>

          <CouponBox {...couponProps} />

          <div className="pt-1">
            <div className="flex justify-between items-center">
              <span className="text-[16px] font-bold text-theme-dark-blue">Total</span>
              <span className="text-[22px] font-extrabold text-theme-pink">€{couponProps.finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Column: Checkout Form & User Details */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white p-6 sm:p-8 shadow-sm border border-theme-gray-100 rounded-lg">
          <CheckoutForm />
        </div>

        <div className="mt-6">
          <Link href="/cart" className="text-[14px] font-semibold text-theme-dark-blue hover:text-theme-pink transition-colors underline underline-offset-4">
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
