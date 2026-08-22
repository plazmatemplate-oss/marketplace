import { Metadata } from 'next';
import OrderHistoryContent from '@/components/order/OrderHistoryContent';

export const metadata: Metadata = {
  title: 'Order History | Plazma Themes',
  description: 'View your past orders.',
  keywords: ["order history", "past orders", "my templates", "purchases"],
  alternates: {
    canonical: "/order-history",
  },
};

export default function OrderHistoryPage() {
  return <OrderHistoryContent />;
}