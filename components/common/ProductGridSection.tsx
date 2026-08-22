"use client";

import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import { useProducts } from "@/hooks/useProducts";

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
}

export default function ProductGridSection({
  title,
  subtitle,
  products: initialProducts = [],
  rows = 2,
  viewMoreLink = "#",
  categoryFilter,
}: Readonly<ProductGridSectionProps>) {
  const { data: apiProducts, isLoading } = useProducts(
    categoryFilter ? { category: categoryFilter } : undefined
  );

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
      }))
    : [];

  const displayProducts = (formattedApiProducts.length > 0 ? formattedApiProducts : initialProducts).slice(0, rows * 4);

  return (
    <section className="container mx-auto px-4 section-padding">
      <div className="flex justify-center mb-10">
        <SectionTitle 
          title={title} 
          subtitle={subtitle}
          align="center"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-theme-gray-500 font-medium">Loading products...</div>
      ) : displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={`${title.replace(/\s+/g, '')}-${product.id}`} {...product} />
          ))}
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
