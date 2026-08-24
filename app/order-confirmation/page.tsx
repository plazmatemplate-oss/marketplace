import { Metadata } from 'next';
import React, { Suspense } from 'react';
import OrderConfirmationContent from '@/components/order/OrderConfirmationContent';

export const metadata: Metadata = {
  title: 'Order Confirmation | Plazma Themes',
  description: 'Thank you for your purchase.',
  keywords: ["order confirmation", "thank you for your purchase", "order success"],
  alternates: {
    canonical: "/order-confirmation",
  },
};

export default function OrderConfirmationPage() {
  return (
    <div className="bg-white min-h-screen">
      <div
        className="hidden md:block w-full h-100 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("/images/about-bg.png")' }}
      >
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="page-overlap-container-tall">
        <Suspense fallback={
          <div className="max-w-3xl mx-auto page-card flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }>
          <OrderConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}