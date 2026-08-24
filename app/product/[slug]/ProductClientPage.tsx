"use client";

import ProductDetailsLayout from "@/components/product/ProductDetailsLayout";
import ProductGridSection from "@/components/common/ProductGridSection";
import { useProductBySlug } from "@/hooks/useProducts";

export default function ProductClientPage({ slug }: { slug: string }) {
  const { data: product, isLoading, error } = useProductBySlug(slug);

  if (isLoading) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-theme-gray-500 font-medium">Loading product details...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-theme-gray-500 font-medium">Product not found.</div>
      </div>
    );
  }

  // Extract subcategory or category slug to pass as categoryFilter for related products
  const categorySlug = typeof product.category === "object"
    ? product.category.slug || product.category._id
    : product.category;

  const subcategorySlug = typeof product.subcategory === "object"
    ? product.subcategory.slug || product.subcategory._id
    : product.subcategory;

  const categoryParam = subcategorySlug || categorySlug;

  return (
    <div className="bg-white">
      <div className="container mx-auto section-padding">
        <ProductDetailsLayout product={product} />
      </div>

      <div className="bg-white py-16 border-t border-theme-gray-100">
        <div className="container mx-auto">
          <ProductGridSection
            title="Ultimate Price Drops on Best Deals"
            categoryFilter={categoryParam}
            rows={1}
            pageSize={8}
            viewMoreLink="/prices-drop"
            isPadding={false}
          />
        </div>
      </div>
    </div>
  );
}
