"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUserProfile } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useCreateOrder } from '@/hooks/useOrders';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@/lib/toast';
import { createRazorpayOrderApi, verifyRazorpayPaymentApi, loadRazorpayScript } from '@/services/paymentService';
import { Loader2 } from 'lucide-react';
import type { CartItem } from '@/types/api';

const checkoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').pipe(z.email('Invalid email format')),
  phone: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userProfile } = useUserProfile();
  const { data: cart } = useCart();
  const createOrderMutation = useCreateOrder();
  const [isProcessing, setIsProcessing] = useState(false);

  const rawItems: CartItem[] = cart?.cartItems || cart?.items || [];
  const subtotal = rawItems.reduce((acc: number, item: CartItem) => {
    const prod = typeof item.book === "object" ? item.book : typeof item.product === "object" ? item.product : null;
    const price = typeof prod?.price === "number" ? prod.price : 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      if (userProfile.email) setValue("email", userProfile.email);
      if (userProfile.address?.firstName) {
        setValue("firstName", userProfile.address.firstName);
      } else if (userProfile.name) {
        const parts = userProfile.name.trim().split(" ");
        setValue("firstName", parts[0] || "");
        setValue("lastName", parts.slice(1).join(" ") || parts[0] || "");
      }
      if (userProfile.address?.lastName) {
        setValue("lastName", userProfile.address.lastName);
      }
      if (userProfile.address?.phone) {
        setValue("phone", userProfile.address.phone);
      }
    }
  }, [userProfile, setValue]);

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true);
    try {
      // Step 1: Create Order API call FIRST to get order ID
      // POST /orders
      const orderItems = rawItems.map((item) => {
        const prod = typeof item.book === "object" ? item.book : typeof item.product === "object" ? item.product : null;
        const prodId = prod?._id || (typeof item.book === "string" ? item.book : typeof item.product === "string" ? item.product : "");
        return {
          productId: prodId,
          quantity: item.quantity || 1,
        };
      });

      const orderPayload = {
        orderItems,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        paymentMethod: "Razorpay",
        totalPrice: subtotal,
      };

      const createdOrder: any = await createOrderMutation.mutateAsync(orderPayload as any);
      const createdOrderId = createdOrder?._id;
      // Step 2: Create Razorpay Order API call with createdOrderId as receipt
      // POST /payment/razorpay-order
      const razorpayOrder = await createRazorpayOrderApi({
        amount: subtotal,
        currency: "INR",
        receipt: createdOrderId || "1",
      });

      // Step 3: Load Razorpay SDK Script and open options modal
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || typeof window === "undefined" || !(window as any).Razorpay) {
        throw new Error("Razorpay SDK failed to load. Please check your internet connection.");
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      const razorpayOrderId = razorpayOrder?.id;
      const razorpayAmount = razorpayOrder?.amount || Math.round(subtotal * 100);

      const options = {
        key: razorpayKey,
        amount: razorpayAmount,
        currency: razorpayOrder?.currency || "INR",
        name: "Plazma Themes",
        description: "Purchase Order",
        order_id: razorpayOrderId,
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone || "",
        },
        handler: async function (response: any) {
          console.log("options-response++++", response);
          
          try {
            // Step 4: Verify Payment API call passing createdOrderId
            // POST /payment/razorpay-verify
            await verifyRazorpayPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: createdOrderId || response.razorpay_order_id,
            });

            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Payment verified and order placed successfully!");
            router.push(`/order-confirmation?orderId=${createdOrderId}`);
          } catch (err: any) {
            console.error("Verification Error:", err);
            toast.error(err?.message || "Payment verification failed.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment process cancelled.");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error("Checkout Error:", error);
      setIsProcessing(false);
      toast.error(error?.message || "Failed to process checkout.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {/* Section 1: Personal Information */}
      <section>
        <div className="flex items-center justify-between border-b border-theme-gray-100 pb-3 mb-5">
          <h2 className="text-[18px] font-bold text-theme-dark-blue flex items-center gap-2">
            1. Personal Information
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] text-theme-gray-700 font-medium">First name *</Label>
            <Input {...register("firstName")} className="bg-white border-theme-gray-200 h-10.5 rounded-sm" placeholder="First name" />
            {errors.firstName && <p className="text-theme-error text-xs">{errors.firstName.message}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-[13px] text-theme-gray-700 font-medium">Last name *</Label>
            <Input {...register("lastName")} className="bg-white border-theme-gray-200 h-10.5 rounded-sm" placeholder="Last name" />
            {errors.lastName && <p className="text-theme-error text-xs">{errors.lastName.message}</p>}
          </div>
          <div className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
            <Label className="text-[13px] text-theme-gray-700 font-medium">Email Address *</Label>
            <Input type="email" {...register("email")} className="bg-white border-theme-gray-200 h-10.5 rounded-sm" placeholder="email@example.com" />
            {errors.email && <p className="text-theme-error text-xs">{errors.email.message}</p>}
            <p className="text-[11px] text-theme-gray-500 mt-1">Your order receipt and digital files will be sent to this email address.</p>
          </div>
        </div>
      </section>

      {/* Section 2: Payment Method */}
      <section>
        <h2 className="text-[18px] font-bold text-theme-dark-blue mb-4 pb-2 border-b border-theme-gray-100">2. Payment Method</h2>
        <div className="bg-theme-gray-50 border border-theme-gray-200 p-4 rounded-sm flex items-center gap-3">
          <input type="radio" checked readOnly className="w-4 h-4 text-primary accent-primary" />
          <span className="text-[14.5px] font-semibold text-theme-gray-800">Pay with Razorpay</span>
        </div>
      </section>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isProcessing || createOrderMutation.isPending}
        className="h-12 w-full sm:w-auto self-end px-10 text-[15px] font-bold tracking-wide uppercase bg-(image:--theme-background-gradiant) border-0 hover:opacity-90 shadow-md rounded-sm mt-2 cursor-pointer flex items-center justify-center gap-2"
      >
        {isProcessing || createOrderMutation.isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay with Razorpay"
        )}
      </Button>
    </form>
  );
}