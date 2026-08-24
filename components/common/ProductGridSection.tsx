"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import { useProducts } from "@/hooks/useProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Product {
  id: number | string;
  slug?: string;
  title: string;
  price: string | number;
  oldPrice?: string;
  image: string;
  isNew?: boolean;
  discount?: string;
  rating?: number;
  sales?: number;
}

interface ProductGridSectionProps {
  title: string;
  subtitle?: string;
  products?: Product[];
  rows?: number;
  viewMoreLink?: string;
  categoryFilter?: string;
  pageSize?: number;
  isPadding?: boolean;
  className?:string;
}

export default function ProductGridSection({
  title,
  subtitle,
  products: initialProducts = [],
  rows = 2,
  viewMoreLink = "#",
  categoryFilter,
  pageSize: customPageSize,
  isPadding = true,
  className
}: Readonly<ProductGridSectionProps>) {
  const [api, setApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);

  const effectivePageSize = customPageSize || rows * 8;

  const { data: apiProducts, isLoading } = useProducts({
    ...(categoryFilter ? { category: categoryFilter } : {}),
    pageSize: effectivePageSize,
  });

  const formattedApiProducts: Product[] = apiProducts && apiProducts.length > 0
    ? apiProducts.map((p, idx) => ({
        id: p._id || idx,
        slug: p.slug,
        title: p.title,
        price: typeof p.price === "number" ? `€${p.price.toFixed(2)}` : p.price,
        oldPrice: p.originalPrice ? `€${p.originalPrice.toFixed(2)}` : undefined,
        image: (p.images && p.images.length > 0) ? p.images[0] : "",
        isNew: p.isNew,
        rating: p.rating ?? 0,
        sales: p.sales || 0,
        demoUrl: p.demoUrl,
      }))
    : [];

  const allProducts = formattedApiProducts.length > 0 ? formattedApiProducts : initialProducts;

  // Pair products into columns based on `rows` (e.g. rows=2 -> 2 per col; rows=1 -> 1 per col)
  const productColumns = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    const cols = [];
    const itemsPerCol = Math.max(1, rows);
    for (let i = 0; i < allProducts.length; i += itemsPerCol) {
      cols.push(allProducts.slice(i, i + itemsPerCol));
    }
    return cols;
  }, [allProducts, rows]);

  // Reset scroll to beginning when category filter changes
  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [categoryFilter, api]);

  // Continuous Auto Scroll 1-by-1 column (pauses immediately on hover)
  useEffect(() => {
    if (!api || isHovered || productColumns.length <= 4) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [api, isHovered, productColumns.length]);

  return (
    <section className={cn("container mx-auto px-4", isPadding && "section-padding", className)}>
      <div className="flex justify-center mb-10">
        <SectionTitle 
          title={title} 
          subtitle={subtitle}
          align="center"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-theme-gray-500 font-medium">Loading products...</div>
      ) : productColumns.length > 0 ? (
        <div
          className="relative py-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
              align: "start",
              duration: 35,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-6 py-3">
              {productColumns.map((col, colIdx) => (
                <CarouselItem
                  key={`col-${title.replace(/\s+/g, '')}-${colIdx}`}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <div className="flex flex-col gap-6 text-left">
                    {col.map((product) => (
                      <ProductCard key={`${title.replace(/\s+/g, '')}-${product.id}`} {...product} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      ) : (
        <div className="text-center py-10 text-theme-gray-500 font-medium">No products found.</div>
      )}
      
      <div className="flex justify-center mt-12">
        <Link 
          href={viewMoreLink} 
          className="bg-(image:--theme-background-gradiant) text-white px-8 py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 shadow-md transition-opacity inline-block"
        >
          View More
        </Link>
      </div>
    </section>
  );
}

