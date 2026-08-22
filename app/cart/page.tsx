"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionTitle from "@/components/common/SectionTitle";
import { Minus, Plus, Trash2, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useAddToCart, useUpdateCartItem, useRemoveFromCart } from "@/hooks/useCart";
import { getImageUrl } from "@/lib/utils";
import { toast } from "@/lib/toast";
import type { CartItem } from "@/types/api";

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const addToCartMutation = useAddToCart();
  const updateCartItemMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const rawItems: CartItem[] = cart?.cartItems || cart?.items || [];

  const handleUpdateQuantity = async (productId: string, currentQty: number, change: number) => {
    if (!productId) return;
    const newQty = currentQty + change;

    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }

    try {
      await updateCartItemMutation.mutateAsync({ productId, quantity: newQty });
    } catch (error: any) {
      toast.error(error?.message || "Failed to update quantity.");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!productId) return;
    try {
      await removeFromCartMutation.mutateAsync(productId);
      toast.success("Item removed from cart.");
    } catch (error: any) {
      toast.error(error?.message || "Failed to remove item.");
    }
  };

  const subtotal = rawItems.reduce((acc: number, item: CartItem) => {
    const prod = typeof item.book === "object" ? item.book : typeof item.product === "object" ? item.product : null;
    const price = typeof prod?.price === "number" ? prod.price : 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  return (
    <div className="bg-white min-h-screen">
      <div
        className="hidden md:block w-full h-100 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("https://plazmathemes.com/modules/badhomebanner/views/img/demo_img_1.png")' }}
      >
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="page-overlap-container-tall">
        <div className="mb-8 text-center md:text-left">
          <SectionTitle 
            title="Shopping Cart" 
            align="left" 
            as="h1" 
            uppercase={false} 
            className="items-start! hidden md:flex" 
          />
          <SectionTitle 
            title="Shopping Cart" 
            align="center" 
            as="h1" 
            uppercase={false} 
            className="md:hidden" 
          />
        </div>

        {!token ? (
          <div className="bg-white p-12 shadow-sm border border-theme-gray-100 rounded-lg text-center flex flex-col items-center justify-center max-w-md mx-auto my-8">
            <ShoppingBag className="w-16 h-16 text-theme-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-theme-gray-800 mb-2">Please Sign In</h2>
            <p className="text-sm text-theme-gray-500 mb-6">You need to be signed in to view your shopping cart.</p>
            <Link href="/login" className="w-full">
              <Button className="w-full h-11 text-sm font-bold bg-(image:--theme-background-gradiant) border-0 shadow-md">
                Sign In to Account
              </Button>
            </Link>
          </div>
        ) : isLoading ? (
          <div className="py-20 flex justify-center items-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : rawItems.length === 0 ? (
          <div className="bg-white p-12 shadow-sm border border-theme-gray-100 rounded-lg text-center flex flex-col items-center justify-center max-w-md mx-auto my-8">
            <ShoppingBag className="w-16 h-16 text-theme-gray-300 mb-4" />
            <h2 className="text-xl font-bold text-theme-gray-800 mb-2">Your Cart is Empty</h2>
            <p className="text-sm text-theme-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/modules" className="w-full">
              <Button className="w-full h-11 text-sm font-bold bg-(image:--theme-background-gradiant) border-0 shadow-md">
                Explore Themes & Modules
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-4 sm:p-8 shadow-sm border border-theme-gray-100 rounded-lg">
                <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-theme-gray-100 pb-4 mb-4 text-[13px] font-bold text-theme-gray-500 uppercase tracking-wide">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-1 text-right">Action</div>
                </div>
                
                <div className="flex flex-col gap-6">
                  {rawItems.map((item: CartItem, idx: number) => {
                    const prod = typeof item.book === "object" ? item.book : typeof item.product === "object" ? item.product : null;
                    const prodId = prod?._id || (typeof item.book === "string" ? item.book : typeof item.product === "string" ? item.product : "");
                    const title = prod?.title || "Product";
                    const slug = prod?.slug;
                    const priceNum = typeof prod?.price === "number" ? prod.price : 0;
                    const priceStr = `€${priceNum.toFixed(2)}`;
                    const imgUrl = getImageUrl(prod?.images?.[0]);
                    const href = slug ? `/product/${slug}` : prodId ? `/product/${prodId}` : "#";
                    const qty = item.quantity || 1;

                    return (
                      <div key={prodId || idx} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center border-b border-theme-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                          <Link href={href} className="w-20 h-20 bg-theme-gray-50 rounded border border-theme-gray-100 relative shrink-0 overflow-hidden">
                            <Image
                              src={imgUrl}
                              alt={title}
                              fill
                              unoptimized
                              className="object-contain p-1"
                            />
                          </Link>
                          <div className="flex flex-col min-w-0">
                            <Link href={href} className="text-[14.5px] font-bold text-theme-dark-blue hover:text-theme-pink transition-colors line-clamp-2 leading-tight">
                              {title}
                            </Link>
                            <p className="text-[13px] text-theme-gray-500 mt-1 sm:hidden">Price: {priceStr}</p>
                          </div>
                        </div>
                        
                        <div className="hidden sm:block col-span-2 text-center text-[14.5px] font-semibold text-theme-gray-800">
                          {priceStr}
                        </div>
                        
                        <div className="col-span-1 sm:col-span-3 flex items-center justify-between sm:justify-center gap-4">
                          <div className="flex items-center border border-theme-gray-200 rounded-sm w-28">
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(prodId, qty, -1)}
                              disabled={qty <= 1 || updateCartItemMutation.isPending || addToCartMutation.isPending || removeFromCartMutation.isPending}
                              className="w-8 h-8 flex items-center justify-center text-theme-gray-500 hover:text-theme-pink transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="text"
                              value={qty}
                              readOnly
                              className="w-full text-center text-[14px] font-semibold text-theme-gray-800 bg-transparent border-none focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => handleUpdateQuantity(prodId, qty, 1)}
                              disabled={updateCartItemMutation.isPending || addToCartMutation.isPending || removeFromCartMutation.isPending}
                              className="w-8 h-8 flex items-center justify-center text-theme-gray-500 hover:text-theme-pink transition-colors disabled:opacity-50 cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="hidden sm:flex col-span-1 items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(prodId)}
                            disabled={updateCartItemMutation.isPending || removeFromCartMutation.isPending}
                            className="text-theme-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-6">
                <Link href="/" className="text-[14px] font-semibold text-theme-dark-blue hover:text-theme-pink transition-colors underline underline-offset-4">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-white p-6 sm:p-8 shadow-sm border border-theme-gray-100 rounded-lg flex flex-col gap-6 sticky top-32">
                <h2 className="text-[18px] font-bold text-theme-dark-blue border-b border-theme-gray-100 pb-4">Order Summary</h2>
                
                <div className="flex flex-col gap-3 text-[14.5px] text-theme-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-semibold text-theme-gray-800">€{subtotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-theme-gray-100 pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[16px] font-bold text-theme-dark-blue">Total</span>
                    <span className="text-[20px] font-bold text-theme-pink">€{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <Link href="/checkout" className="block w-full">
                    <Button className="w-full h-12 text-[15px] font-bold tracking-wide uppercase bg-(image:--theme-background-gradiant) border-0 hover:opacity-90 shadow-md cursor-pointer">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}