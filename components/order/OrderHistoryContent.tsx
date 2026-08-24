"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/common/SectionTitle";
import { useMyOrders } from "@/hooks/useOrders";

export default function OrderHistoryContent() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { data: apiOrders, isLoading } = useMyOrders();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="bg-white min-h-[400px] flex items-center justify-center">
        <p className="text-theme-gray-500 font-medium">Checking authorization...</p>
      </div>
    );
  }

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
      case 'Completed':
        return 'bg-green-100 text-green-700 border border-green-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700 border border-blue-200';
      case 'Processing':
        return 'bg-purple-100 text-purple-700 border border-purple-200';
      case 'Pending':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const orders = apiOrders && apiOrders.length > 0
    ? apiOrders.map((o) => ({
        id: o._id ? `#${o._id.substring(o._id.length - 8).toUpperCase()}` : o.id || "#PT-0000",
        date: o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recently",
        total: o.totalPrice ? `€${Number(o.totalPrice).toFixed(2)}` : (o.total || "€0.00"),
        status: o.status || (o.isDelivered ? "Delivered" : "Pending"),
        isPaid: Boolean(o.isPaid),
      }))
    : [];

  return (
    <div className="bg-white">
      <div
        className="hidden md:block w-full h-100 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("/images/about-bg.png")' }}
      >
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="page-overlap-container-tall">
        
        <div className="mb-6">
          <SectionTitle 
            title="Order History" 
            align="left" 
            as="h1" 
            uppercase={false} 
            className="items-start! hidden md:flex" 
          />
          <SectionTitle 
            title="Order History" 
            align="center" 
            as="h1" 
            uppercase={false} 
            className="md:hidden" 
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full">
            <div className="page-card">
              <p className="text-[14.5px] text-theme-gray-600 mb-6">Here are the orders you&apos;ve placed since your account was created.</p>
              
              {isLoading ? (
                <div className="text-center py-10 text-theme-gray-500 font-medium">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-theme-gray-100 flex items-center justify-center text-theme-gray-400 text-2xl font-bold">
                    📦
                  </div>
                  <p className="text-theme-gray-800 font-bold text-base">No Orders Found</p>
                  <p className="text-theme-gray-500 text-sm max-w-sm text-center">You haven&apos;t placed any orders yet. Browse our themes and templates to start shopping!</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-150 text-left border-collapse">
                    <thead>
                      <tr className="border-b border-theme-gray-200">
                        <th className="py-4 px-4 text-[13px] font-bold text-theme-gray-500 uppercase tracking-wide">Order Reference</th>
                        <th className="py-4 px-4 text-[13px] font-bold text-theme-gray-500 uppercase tracking-wide">Date</th>
                        <th className="py-4 px-4 text-[13px] font-bold text-theme-gray-500 uppercase tracking-wide">Total Price</th>
                        <th className="py-4 px-4 text-[13px] font-bold text-theme-gray-500 uppercase tracking-wide">Payment Status</th>
                        <th className="py-4 px-4 text-[13px] font-bold text-theme-gray-500 uppercase tracking-wide">Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, i) => (
                        <tr key={i} className="border-b border-theme-gray-100 last:border-0 hover:bg-theme-gray-50/50 transition-colors">
                          <td className="py-4 px-4 text-[14px] font-bold text-theme-dark-blue">{order.id}</td>
                          <td className="py-4 px-4 text-[14px] text-theme-gray-600">{order.date}</td>
                          <td className="py-4 px-4 text-[14px] font-semibold text-theme-gray-800">{order.total}</td>
                          <td className="py-4 px-4">
                             <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold ${order.isPaid ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-rose-100 text-rose-700 border border-rose-200'}`}>
                               {order.isPaid ? 'Completed' : 'Failed'}
                             </span>
                          </td>
                          <td className="py-4 px-4">
                             <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-bold ${getStatusBadgeStyle(order.status)}`}>
                               {order.status}
                             </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
