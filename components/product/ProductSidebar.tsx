"use client";

import { ShoppingCart, Star, ArrowUpRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReviewDialog from "./ReviewDialog";
import { MOCK_PRODUCT_DETAIL } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/api";
import { useAddToCart } from "@/hooks/useCart";
import { useProducts } from "@/hooks/useProducts";
import { getImageUrl } from "@/lib/utils";
import { toast } from "@/lib/toast";

const TAGS = [
  "Plazma Themes",
  "Mobile Store",
  "Laptop Store",
  "Electronics & Computers",
  "Kid's Fashion",
  "Audio Store",
  "Computer Store",
  "Bakery shop",
  "Organic Food",
  "Furniture Themes",
  "Coffee Shop",
  "Grocery Store",
  "Market",
  "Beauty Care",
  "Vitamin",
  "E-Commerce Themes",
  "Multipurpose Themes",
  "Men's Fashion",
  "Women's Fashion",
  "Health Care",
  "Purse & Bag Shop",
  "Campaign & Travel",
  "Medical Store",
  "Plant Store",
  "Food",
  "Futurist Themes",
  "Shop",
  "Homemade Shop",
  "Toy shop",
];

const features = [
  "6 months support from plazma themes",
  "Future updates",
  "Documantation included",
  "Theme Package with demo images",
];

interface ProductSidebarProps {
  product?: Product;
}

export default function ProductSidebar({ product }: Readonly<ProductSidebarProps>) {
  const router = useRouter();
  const addToCartMutation = useAddToCart();

  const categorySlug = typeof product?.category === "object"
    ? product.category.slug || product.category._id
    : product?.category;

  const subcategorySlug = typeof product?.subcategory === "object"
    ? product.subcategory.slug || product.subcategory._id
    : product?.subcategory;

  const categoryParam = subcategorySlug || categorySlug;

  const { data: apiProducts, isLoading: isProductsLoading } = useProducts({
    category: categoryParam,
    pageSize: 4,
  });

  const displayProducts = (apiProducts || [])
    .filter((p) => p._id !== product?._id && p.slug !== product?.slug)
    .slice(0, 3);

  const priceDisplay = product?.price !== undefined
    ? (typeof product.price === "number" ? `€${product.price.toFixed(2)}` : product.price)
    : MOCK_PRODUCT_DETAIL.price;

  const ratingVal = product?.rating ?? MOCK_PRODUCT_DETAIL.rating;

  const handleAddToCart = async () => {
    if (!product?._id) {
      toast.error("Product ID is missing.");
      return;
    }

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Please sign in to add items to cart.");
      router.push("/login");
      return;
    }

    try {
      await addToCartMutation.mutateAsync({ productId: product._id, quantity: 1 });
      toast.success(`"${product.title || 'Product'}" added to cart!`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to add product to cart.");
    }
  };

  return (
    <div className="flex flex-col gap-6">

      <Card>
        <CardHeader className="flex flex-row justify-between items-start border-b border-theme-gray-100 pb-4">
          <CardTitle className="text-theme-gray-800 font-bold text-[16px]">{MOCK_PRODUCT_DETAIL.license.type}</CardTitle>
          <div className="text-right">
            <span className="text-[28px] font-bold text-theme-gray-900 block leading-none">{priceDisplay}</span>
            <div className="flex text-theme-gray-300 mt-1 justify-end gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < ratingVal ? "fill-accent text-accent" : "text-theme-gray-300"}`} />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="flex flex-col gap-3 mb-6">
            {features.map((feature, idx) => (
              <li key={idx} className="text-[13px] text-theme-gray-600">
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex mb-4">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              className="w-full bg-theme-yellow hover:bg-theme-yellow-hover text-theme-gray-900 font-bold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70"
            >
              {addToCartMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
              Add To Cart
            </button>
          </div>

          <ReviewDialog
            productId={product?._id}
            productTitle={product?.title}
            productImage={product?.images?.[0]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-theme-gray-100 pb-3">
          <CardTitle className="text-[15px] font-semibold text-theme-gray-800">Tags</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-wrap gap-2">
          {TAGS.map((tag, i) => (
            <Link key={i} href="/modules" className="text-[12px] text-theme-gray-500 bg-white border border-theme-gray-200 hover:border-theme-gray-300 hover:text-theme-gray-900 px-3 py-1.5 rounded-sm transition-colors">
              {tag}
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b border-theme-gray-100 pb-3">
          <CardTitle className="text-[15px] font-semibold text-theme-gray-800">About module</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 flex flex-col gap-4">
          <div>
            <div className="text-[12px] font-semibold text-theme-gray-400">PrestaShop Version</div>
            <div className="text-[13px] text-theme-gray-600">V1.6.0.1 - V8.2.0</div>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-theme-gray-400">Multishop Compatibility</div>
            <div className="text-[13px] text-theme-gray-600">Yes</div>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-theme-gray-400">Last Update</div>
            <div className="text-[13px] text-theme-gray-600">Dec 4, 2025</div>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-theme-gray-400">Publication Date</div>
            <div className="text-[13px] text-theme-gray-600">Nov 27, 2024</div>
          </div>
        </CardContent>
      </Card>

      {isProductsLoading ? (
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-[16px] font-bold text-theme-gray-900">You might also like</h3>
          <div className="flex justify-center py-6">
            <Loader2 className="w-6 h-6 animate-spin text-theme-gray-400" />
          </div>
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="flex flex-col gap-4 mt-2">
          <h3 className="text-[16px] font-bold text-theme-gray-900">You might also like</h3>
          {displayProducts.map((p) => {
            const productSlug = p.slug || p._id;
            const href = productSlug ? `/product/${productSlug}` : "#";
            const imageUrl = p.images?.[0] ? getImageUrl(p.images[0]) : getImageUrl("");
            const formattedPrice = typeof p.price === "number" ? `€${p.price.toFixed(2)}` : (p.price || "€0.00");

            return (
              <Card key={p._id || p.slug} className="p-3 flex gap-3 hover:shadow-md transition-shadow">
                <div className="relative w-20 h-20 bg-theme-gray-50 rounded shrink-0 overflow-hidden">
                  <Image src={imageUrl} alt={p.title} fill unoptimized className="object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <Link href={href} className="text-[13px] font-semibold text-theme-gray-800 hover:text-primary line-clamp-2 leading-tight">
                    {p.title}
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[14px] font-bold text-theme-gray-900">{formattedPrice}</span>
                    <Link href={href} className="text-theme-gray-400 hover:text-primary">
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : null}

    </div>
  );
}