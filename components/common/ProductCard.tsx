"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, TrendingUp, Star, Loader2, ExternalLink } from "lucide-react";
import { cn, getImageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { useAddToCart } from "@/hooks/useCart";
import { toast } from "@/lib/toast";

export interface ProductCardProps {
  id?: string | number;
  slug?: string;
  title: string;
  price: string | number;
  oldPrice?: string | number;
  image: string;
  isNew?: boolean;
  discount?: string;
  rating?: number;
  sales?: number;
  demoUrl?: string;
}

export default function ProductCard({
  id,
  slug,
  title,
  price,
  oldPrice,
  image,
  isNew,
  discount,
  rating = 0,
  sales = 0,
  demoUrl,
}: Readonly<ProductCardProps>) {
  const router = useRouter();
  const addToCartMutation = useAddToCart();
  const imageUrl = getImageUrl(image);
  const productHref = slug ? `/product/${slug}` : id ? `/product/${id}` : "#";
  const liveSiteUrl = demoUrl;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id) {
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
      await addToCartMutation.mutateAsync({ productId: String(id), quantity: 1 });
      toast.success(`"${title}" added to cart!`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to add product to cart.");
    }
  };

  return (
    <Card className="group relative p-3.75 overflow-hidden flex flex-col h-full transition-shadow duration-300 hover:shadow-md">
      
      <div className="relative aspect-square bg-white shrink-0 rounded-md overflow-hidden">
        <Link href={productHref}>
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={400}
            unoptimized
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
            // onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/400x400?text=No+image+available"; }}
          />
        </Link>

        {isNew && (
          <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden z-10 pointer-events-none">
            <div className="absolute top-0 left-0 bg-theme-success text-white text-[11px] font-bold py-1 w-24 text-center -rotate-45 -translate-x-6.5 translate-y-2.5 shadow-sm tracking-wider">
              NEW
            </div>
          </div>
        )}

        {discount && (
          <div className="absolute top-2 right-2 z-10">
             <div className="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
               {discount}
             </div>
          </div>
        )}
      </div>

      <div className="relative flex flex-col grow bg-white transition-all duration-300 ease-in-out transform group-hover:-translate-y-13 z-10">
        
        <CardContent className="pt-4 flex flex-col flex-1 px-0 pb-0">
          <Link href={productHref} className="text-theme-gray-700 font-semibold text-[14px] hover:text-theme-pink transition-colors line-clamp-2 mb-4 leading-tight min-h-[40px] block">
            {title}
          </Link>
          
          <div className="flex justify-between items-end mt-auto">
            <div className="flex flex-col gap-1.5">
              <div className="flex text-theme-gray-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("w-3.5 h-3.5", i < rating ? "fill-theme-gray-400 text-theme-gray-400" : "text-theme-gray-300")} />
                ))}
              </div>
              
              <div className="flex items-center gap-1 text-theme-gray-600 text-[13px] font-medium">
                {sales} sales <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex flex-col items-end justify-end min-h-8.5">
              {oldPrice && <span className="text-theme-gray-400 line-through text-xs mb-0.5">{oldPrice}</span>}
              <span className="text-theme-gray-900 font-bold text-[19px] leading-none">{price}</span>
            </div>
          </div>
        </CardContent>

        <div className="mt-2.5 absolute top-full left-0 right-0 h-13 px-0 flex gap-2 pb-4 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={addToCartMutation.isPending}
            className="flex-1 bg-theme-dark-blue text-white py-2 rounded-sm font-semibold text-xs sm:text-sm hover:bg-theme-gray-800 transition-colors flex items-center justify-center gap-1.75 cursor-pointer disabled:opacity-70 whitespace-nowrap"
          >
            {addToCartMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
            <span>Add To Cart</span>
          </button>

          {liveSiteUrl && (
            <a
              href={liveSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="bg-(image:--theme-background-gradiant) text-white px-2.5 py-2 rounded-sm font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.75 shrink-0 transition-opacity hover:opacity-90 cursor-pointer whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
        
      </div>
      
    </Card>
  );
}
