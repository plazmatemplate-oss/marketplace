"use client";

import { useState } from "react";
import ProductMainContent from "./ProductMainContent";
import ProductSidebar from "./ProductSidebar";
import type { Product } from "@/types/api";
import { MOCK_PRODUCT_DETAIL } from "@/lib/data";

interface ProductDetailsLayoutProps {
  product: Product;
}

export default function ProductDetailsLayout({ product }: Readonly<ProductDetailsLayoutProps>) {
  const [activeTab, setActiveTab] = useState("description");

  const title = product?.title || MOCK_PRODUCT_DETAIL.title;
  const sales = product?.sales !== undefined ? product.sales : MOCK_PRODUCT_DETAIL.sales;
  // const isUpdatedVersion = product?.isNew ?? MOCK_PRODUCT_DETAIL.isUpdatedVersion;

  return (
    <div className="flex flex-col">
      <h1 className="text-[22px] md:text-[28px] font-bold text-theme-gray-900 leading-tight mt-4 mb-6">
        {title}
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-theme-gray-200 pb-3 gap-4">
        <div className="flex">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={`px-1 mr-8 text-[14px] font-bold whitespace-nowrap transition-colors relative cursor-pointer ${activeTab === "description" ? "text-theme-gray-900" : "text-theme-gray-500 hover:text-theme-gray-700"}`}
          >
            Description
            {activeTab === "description" && (
              <span className="absolute left-0 right-0 -bottom-3.25 h-0.75 bg-(image:--theme-background-gradiant)"></span>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[12px] font-bold">
          <span className="text-theme-gray-600">By <span className="text-theme-gray-900 font-bold">{MOCK_PRODUCT_DETAIL.author}</span></span>
          <span className="text-theme-gray-300">|</span>
          <span className="text-theme-dark-blue">{sales} sales</span>
          <span className="bg-(image:--theme-background-gradiant) text-white px-2 py-0.5 rounded-sm">Updated Version</span>
          <span className="bg-theme-light-blue text-theme-dark-blue px-2 py-0.5 rounded-sm">{MOCK_PRODUCT_DETAIL.version}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
          <ProductMainContent activeTab={activeTab} product={product} />
        </div>

        <div className="lg:col-span-4 xl:col-span-3 lg:sticky lg:top-27.5 self-start z-10">
          <ProductSidebar product={product} />
        </div>
      </div>
    </div>
  );
}
