"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/common/ProductCard";
import SectionTitle from "@/components/common/SectionTitle";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function UltimateShowcases() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Fetch categories dynamically from API
  const { data: apiCategories, isLoading: isCategoriesLoading } = useCategories();

  // Dynamic categories list built strictly from API response
  const categoriesList = useMemo(() => {
    if (!apiCategories || apiCategories.length === 0) return [];

    const mapped = apiCategories.map((cat) => ({
      id: cat._id,
      slug: cat.slug,
      name: cat.name,
      count: cat.itemCount || 0,
    }));

    const totalCount = mapped.reduce((acc, cat) => acc + (cat.count || 0), 0);

    return [
      { id: "all", slug: "all", name: "Home", count: totalCount },
      ...mapped,
    ];
  }, [apiCategories]);

  // Determine selected category parameter for products API
  const selectedCategoryParam = useMemo(() => {
    if (activeTab === "all" || activeTab === "home") return undefined;
    return activeTab;
  }, [activeTab]);

  // 2. Fetch products dynamically from API based on selected category tab
  const { data: apiProducts, isLoading: isProductsLoading } = useProducts({
    ...(selectedCategoryParam ? { category: selectedCategoryParam } : {}),
    pageSize: 16,
  });

  // Format API products for ProductCard component
  const formattedProducts = useMemo(() => {
    if (!apiProducts) return [];
    return apiProducts.map((p, idx) => ({
      id: p._id || idx,
      slug: p.slug,
      title: p.title,
      price: typeof p.price === "number" ? `€${p.price.toFixed(2)}` : p.price,
      oldPrice: p.originalPrice ? `€${p.originalPrice.toFixed(2)}` : undefined,
      image: p.images && p.images.length > 0 ? p.images[0] : "",
      isNew: p.isNew,
      discount:
        p.originalPrice && typeof p.price === "number" && typeof p.originalPrice === "number" && p.originalPrice > p.price
          ? `-${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%`
          : undefined,
      rating: p.rating ?? 0,
      sales: p.sales || 0,
      demoUrl: p.demoUrl,
    }));
  }, [apiProducts]);

  // Pair products into columns of 2 items (Top & Bottom rows) for 1-by-1 column scrolling
  const productColumns = useMemo(() => {
    if (!formattedProducts || formattedProducts.length === 0) return [];
    const columns = [];
    for (let i = 0; i < formattedProducts.length; i += 2) {
      columns.push(formattedProducts.slice(i, i + 2));
    }
    return columns;
  }, [formattedProducts]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    setScrollSnaps(api.scrollSnapList());
    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, productColumns]);

  // Reset scroll to first slide when active category tab changes
  useEffect(() => {
    if (api) {
      api.scrollTo(0);
    }
  }, [activeTab, api]);

  // Continuous Auto Scroll 1-by-1 column (stops immediately when hovered)
  useEffect(() => {
    if (!api || isHovered || productColumns.length <= 4) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2500);

    return () => clearInterval(interval);
  }, [api, isHovered, productColumns.length]);

  const visibleCategories = showAllCategories ? categoriesList : categoriesList.slice(0, 8);

  return (
    <section className="w-full bg-theme-light pt-16 pb-12 text-center border-b border-theme-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-[54px] font-extrabold text-transparent bg-clip-text bg-(image:--theme-background-gradiant) leading-none mb-2 block w-fit mx-auto">
          249+
        </h2>
        <SectionTitle
          title="Ultimate Showcases"
          subtitle="Discover The Pinnacle Of Presentation With Our Stunning, High-Quality Demos. Experience The Best In Design And Innovation, All In One Place."
          className="mb-8"
        />

        {isCategoriesLoading ? (
          <div className="flex justify-center items-center py-6 text-theme-gray-500 font-medium">
            Loading categories...
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 w-full mx-auto mb-6">
            {visibleCategories.map((cat) => {
              const isActive = activeTab === cat.id || activeTab === cat.slug;
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-2.5 rounded-sm flex items-center justify-center gap-3 font-semibold text-sm shadow-sm transition-all w-[calc(50%-8px)] lg:w-[calc(25%-12px)] cursor-pointer
                    ${isActive
                      ? "bg-(image:--theme-background-gradiant) text-white shadow-md"
                      : "bg-white text-theme-gray-700 hover:shadow-md"
                    }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {categoriesList.length > 8 && (
          <div className="flex justify-center mb-12">
            <button
              type="button"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="bg-white border border-theme-gray-100 shadow-sm text-theme-gray-700 hover:text-theme-pink px-8 py-2.5 rounded-sm font-semibold text-sm transition-colors cursor-pointer"
            >
              {showAllCategories ? "Hide Category" : "Show All Category"}
            </button>
          </div>
        )}

        {isProductsLoading ? (
          <div className="py-12 text-center text-theme-gray-500 font-medium">
            Loading showcase templates...
          </div>
        ) : productColumns.length > 0 ? (
          <div
            className="relative mb-8 py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Shadcn Carousel: 4 columns visible (8 products), scrolling 1-by-1 column */}
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
                    key={`col-${colIdx}`}
                    className="pl-6 basis-full sm:basis-1/2 lg:basis-1/4"
                  >
                    <div className="flex flex-col gap-6 text-left">
                      {col.map((product) => (
                        <ProductCard key={`showcase-${product.id}`} {...product} />
                      ))}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        ) : (
          <div className="py-12 text-center text-theme-gray-500 font-medium">
            No templates found.
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Link href="/megashop" className="bg-(image:--theme-background-gradiant) text-white px-8 py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 shadow-md transition-opacity inline-block">
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}



