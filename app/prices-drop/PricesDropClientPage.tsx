"use client";

import React, { useEffect, useRef, useMemo } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/common/ProductCard";
import { useInfiniteProducts } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";
import type { Product } from "@/types/api";

export default function PricesDropClientPage() {
  const pageSize = 12;
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProducts({}, pageSize);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const products: Product[] = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page: any) => {
      if (Array.isArray(page)) return page;
      return page?.data || page?.products || [];
    });
  }, [data?.pages]);

  useEffect(() => {
    const target = observerRef.current;
    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="bg-white min-h-screen">
      <div
        className="hidden md:block w-full h-100 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("/images/about-bg.png")' }}
      >
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="page-overlap-container-tall">
        <div className="mb-8 text-center md:text-left">
          <SectionTitle
            title="Price Drops"
            align="left"
            as="h1"
            uppercase={false}
            className="items-start! hidden md:flex"
          />
          <SectionTitle
            title="Price Drops"
            align="center"
            as="h1"
            uppercase={false}
            className="md:hidden"
          />
        </div>

        <div className="page-card">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-theme-gray-100 h-80 rounded-md animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center text-theme-gray-500 font-medium">
              No price drop products found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((item: Product, idx: number) => {
                  const formattedPrice = typeof item.price === "number" ? `€${item.price.toFixed(2)}` : `€${item.price}`;
                  const formattedOldPrice = item.originalPrice ? `€${Number(item.originalPrice).toFixed(2)}` : undefined;

                  return (
                    <ProductCard
                      key={item._id ? `${item._id}-${idx}` : idx}
                      id={item._id}
                      slug={item.slug}
                      title={item.title}
                      price={formattedPrice}
                      oldPrice={formattedOldPrice}
                      image={item.images?.[0] || ""}
                      isNew={item.isNew}
                      rating={item.rating || 5}
                      sales={item.sales || 0}
                    />
                  );
                })}
              </div>

              {/* Intersection Observer Sentinel for Infinite Scroll */}
              <div ref={observerRef} className="py-8 flex justify-center items-center w-full">
                {isFetchingNextPage ? (
                  <div className="flex items-center gap-2 text-theme-gray-600 font-semibold text-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <span>Loading more products...</span>
                  </div>
                ) : hasNextPage ? (
                  <button
                    type="button"
                    onClick={() => fetchNextPage()}
                    className="px-6 py-2.5 bg-theme-gray-100 hover:bg-theme-gray-200 text-theme-gray-800 text-sm font-semibold rounded-md transition-colors cursor-pointer"
                  >
                    Load More
                  </button>
                ) : (
                  <p className="text-xs text-theme-gray-400 font-medium">You&apos;ve reached the end of Price Drops</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
