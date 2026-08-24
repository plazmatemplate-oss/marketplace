"use client";

import React, { useRef, useEffect, useMemo } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import CategorySidebar from "@/components/category/CategorySidebar";
import ProductFilters from "@/components/category/ProductFilters";
import ProductCard from "@/components/common/ProductCard";
import { useInfiniteProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { getImageUrl } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const CATEGORY_NAMES: Record<string, string> = {
  "multipurpose-themes": "Multipurpose Themes",
  "electronic-computers": "Electronics & Computers",
  "fashion-shoes": "Fashion & Shoes",
  "food-restaurant": "Food & Restaurant",
  "kids-Toys": "Kids & Toys",
  "Medical-themes": "Medical Themes",
  "beauty-health": "Beauty & health",
  "leaf-bloom": "Leaf & Bloom",
  "art-culture": "Art & Culture",
  "sports-activities-travel": "Sports, Activities & Travel",
  "drink-tobacco": "Drink & Tobacco",
  "cars-automotive": "Cars & Automotive",
  "holidays-gifts-flowers": "Holidays, Gifts & Flowers",
  "education-books": "Education & Books",
  "jewelry-accessories": "Jewelry & Accessories",
  "animals-pets": "Animals & Pets",
  "modules": "Multipurpose Themes",
  "megashop": "MegaShop Themes",
  "estore": "E-Store Themes",
};

interface CategoryClientPageProps {
  categorySlug?: string;
  pageTitle?: string;
  fetchWithoutCategory?: boolean;
}

export default function CategoryClientPage({
  categorySlug = "",
  pageTitle,
  fetchWithoutCategory = false,
}: Readonly<CategoryClientPageProps>) {
  const { data: fetchedCategories } = useCategories();
  
  const queryParams = fetchWithoutCategory ? undefined : { category: categorySlug };
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProducts(queryParams, 12);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const matchedCat = categorySlug ? fetchedCategories?.find((c) => c.slug === categorySlug) : undefined;
  const title = pageTitle || matchedCat?.name || CATEGORY_NAMES[categorySlug] || (categorySlug ? categorySlug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ") : "Products");

  const products = useMemo(() => {
    if (!data?.pages) return [];
    const allProducts = data.pages.flatMap((page) => page);
    const seen = new Set<string>();
    return allProducts.filter((product) => {
      if (!product?._id) return true;
      if (seen.has(product._id)) return false;
      seen.add(product._id);
      return true;
    });
  }, [data?.pages]);

  return (
    <div className="bg-theme-light-gray section-padding">
      <div className="container mx-auto">
        
        <div className="flex flex-col items-center mb-12">
          <SectionTitle title={title} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-70 shrink-0 flex flex-col gap-8">
            <CategorySidebar />
            {/* <ProductFilters /> */}
          </div>

          <div className="flex-1 flex flex-col w-full">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-[15px] text-theme-gray-600">{products.length} products.</span>
            </div>

            {isLoading ? (
              <div className="py-20 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : products.length === 0 ? (
              <div className="py-16 text-center text-theme-gray-500 font-medium bg-white rounded-lg border border-theme-gray-100">
                No products found in this category.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <ProductCard 
                      key={`${product._id || product.slug || 'product'}-${index}`}
                      id={product._id}
                      slug={product.slug}
                      title={product.title}
                      price={typeof product.price === "number" ? `€${product.price.toFixed(2)}` : String(product.price)}
                      oldPrice={product.originalPrice ? `€${product.originalPrice.toFixed(2)}` : undefined}
                      image={getImageUrl(product.images?.[0])}
                      isNew={product.isNew}
                      rating={product.rating || 0}
                      sales={product.sales}
                      demoUrl={product.demoUrl}
                    />
                  ))}
                </div>

                {/* Infinite Scroll Trigger & Loader */}
                <div ref={observerTarget} className="py-8 flex items-center justify-center">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-2 text-theme-gray-600 font-medium">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span>Loading more products...</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
