"use client";

import { useState } from "react";
import { ExternalLink, Pencil, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { MOCK_PRODUCT_DETAIL } from "@/lib/data";
import type { Product } from "@/types/api";
import { getImageUrl } from "@/lib/utils";
import { HTMLViewer } from "../common/HTMLView";
import { useProductReviews } from "@/hooks/useProducts";

const ReviewDialog = dynamic(() => import("./ReviewDialog"), { ssr: false });

const PRODUCT_FEATURES = [
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_1.png", title: "Google Fonts", desc: "All layouts created with differnt google fonts to make website more beautiful, fast, and open through great typography." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_2.png", title: "PSD Files Included", desc: "We provide layered organized psd files for all layouts (for those who want to photoshop)." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_3.png", title: "RTL Support", desc: "RTL support means you can spot 'right to left' languages. This ensures that your site can cater to readers from all around the globe." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_4.png", title: "Multi Store Ready", desc: "Prestashop multistore features enable with this theme to manage multiple online store with one admin panel." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_5.png", title: "Multi Language", desc: "This theme is compatible with all language and currency provide by prestashop which help to sale your product worldwide." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_6.png", title: "Child Theme Support", desc: "To make transferring your settings even easier with child theme support! These make it easier to switch themes, upgrade and more." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_7.png", title: "100% Responsive Design", desc: "This theme is fully responsive. Tested on real devices iOS, Android & Windows based." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_8.png", title: "SEO Optimization", desc: "SEO optimized sites helps you to increase the visibility of your website when people search for products or services." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_1.png", title: "Ajax Cart", desc: "This feature helps to add and remove products directly into the cart from any page using Ajax operations." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_2.png", title: "Ajax Quickview", desc: "This feature allows customers to see product details on popup window with ajax from any product list page." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_3.png", title: "ajax wishlist & compare", desc: "wishlist feature helps you to mark product as favourite for future buy and compare feature will help you to compare different products feature." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_4.png", title: "Ajax product filter", desc: "this module is display on category page to filter products with different criteria without page refresh." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_5.png", title: "Content Management System", desc: "it refers to the software platform that allows users to create, manage, and publish content on their online store, which is primarily focused on e-commerce functionalities within the PrestaShop framework." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_6.png", title: "Product Comment Module", desc: "Product comment module is display review for your products given by your customers." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_7.png", title: "Blog Module", desc: "We provide blog module to create post for your store." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_8.png", title: "Count Down Timer", desc: "Product offer count down timer module will help you to set discount for specific time which display on frontend with timer." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_9.png", title: "Product Tab", desc: "Display details description about product and features on product page using click on different tab." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_1.png", title: "Product Zoom", desc: "Product image zoom feature allows you to facilitate users in magnifying product images to get a clear picture of the store item of their interest." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_2.png", title: "Lazy Load", desc: "Lazy load is a technique that defers loading of non-critical resources at page load time which help us to improve store performance." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_3.png", title: "Custom CMS Banner", desc: "Custom banners provide an easy way to display your content very amazing on your website." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_4.png", title: "Product Grid/List", desc: "Product Gris/List allows you to changes product view from grid to list and list to grid view." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_5.png", title: "Online Chat", desc: "It allows you to live chat with website visitors, monitor site traffic, and analyze visitors web activities" },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_6.png", title: "Newsletter Popup", desc: "Using this module you can attract new subscribers and retain them with a discount on their next purchase." },
  { img: "https://plazmathemes.com/modules/badfeatureblock/views/img/demo_img_7.png", title: "EU Cookie Law", desc: "EU cookie law module allows you to elegantly inform users that your site uses cookies through an elegant notification at bottom of your site." }
];

export default function ProductMainContent({
  activeTab,
  product,
}: Readonly<{
  activeTab: string;
  product?: Product;
}>) {
  const images = (product?.images && product.images.length > 0) ? product.images : MOCK_PRODUCT_DETAIL.images;
  const [selectedImg, setSelectedImg] = useState(images[0]);
  const activeImgUrl = getImageUrl(selectedImg || images[0]);

  const liveDemoUrl = product?.demoUrl || MOCK_PRODUCT_DETAIL.liveDemoUrl;

  // Fetch reviews using API endpoint /products/{id}/reviews
  const { data: apiReviewsData } = useProductReviews(product?._id || "");

  const apiReviews = apiReviewsData?.reviews && apiReviewsData.reviews.length > 0
    ? apiReviewsData.reviews.map((r, idx) => ({
        id: r._id || r.id || idx,
        author: r.author || (typeof r.user === "object" ? r.user?.name : r.user) || "Anonymous",
        rating: r.rating || 5,
        date: r.createdAt ? new Date(r.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : (r.date || "Recently"),
        content: r.comment || r.content || "",
      }))
    : null;

  const reviewsList = apiReviews;

  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const displayedFeatures = showAllFeatures
    ? PRODUCT_FEATURES
    : PRODUCT_FEATURES.slice(0, 12);

  const isHtmlDescription = typeof product?.description === "string" && product.description.trim().startsWith("<");

  return (
    <div className="bg-white">
      {activeTab === "description" && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <div className="flex justify-end mb-3">
              <Link
                href={liveDemoUrl}
                target="_blank"
                className="flex items-center gap-2 rounded-md bg-theme-dark-blue px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-theme-dark-blue-hover"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </Link>
            </div>

            <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg border border-theme-gray-100 bg-theme-gray-50 sm:aspect-video mb-4">
              <Image
                src={activeImgUrl}
                alt={product?.title || "Product Image"}
                fill
                unoptimized
                className="absolute inset-0 h-full w-full object-contain"
                // onError={(e) => {
                //   e.currentTarget.src = "https://via.placeholder.com/600x400?text=No+image+available";
                // }}
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => {
                  const thumbUrl = getImageUrl(img);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImg(img)}
                      className={`relative w-20 h-16 rounded border overflow-hidden shrink-0 cursor-pointer ${
                        selectedImg === img ? "border-primary ring-2 ring-primary/20" : "border-theme-gray-200"
                      }`}
                    >
                      <Image
                        src={thumbUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            {product?.description ? (
              isHtmlDescription ? (
                // <div
                //   className="prose max-w-none text-[14px] leading-relaxed text-theme-gray-600 mb-8 "
                //   dangerouslySetInnerHTML={{ __html: product.description }}
                // />
            <HTMLViewer content={product.description} />

              ) : (
                <div className="mb-8 text-[14px] leading-relaxed text-theme-gray-600 whitespace-pre-line">
                  {product.description}
                </div>
              )
            ) : (
              <>
                <h2 className="mb-4 text-[20px] font-bold text-theme-gray-900">
                  {MOCK_PRODUCT_DETAIL.description.heading}
                </h2>
                {MOCK_PRODUCT_DETAIL.description.paragraphs.map((p, idx) => (
                  <p key={idx} className="mb-4 text-[14px] leading-relaxed text-theme-gray-600">
                    {p}
                  </p>
                ))}
              </>
            )}

            <h3 className="mb-4 text-[18px] font-bold text-theme-gray-900">
              Features
            </h3>

            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {displayedFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center rounded-xl border border-theme-gray-200 p-6 text-center transition-shadow hover:shadow-md bg-white"
                >
                  <Image
                    src={feat.img}
                    alt={feat.title}
                    width={64}
                    height={64}
                    unoptimized
                    className="mb-5 h-16 w-16 object-contain"
                  />
                  <h4 className="mb-2 text-[15px] font-bold text-theme-gray-700">
                    {feat.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-theme-gray-500 line-clamp-3">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            {PRODUCT_FEATURES.length > 12 && (
              <div className="mb-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="rounded bg-(image:--theme-background-gradiant) px-6 py-2.5 text-[14px] font-bold text-white shadow-sm transition-opacity hover:opacity-90 cursor-pointer"
                >
                  {showAllFeatures ? "View Less" : "View More"}
                </button>
              </div>
            )}

            <Card className="p-6 md:p-8">
              {reviewsList && reviewsList.length > 0 && (
                <div className="flex flex-col">
                  <div className="mb-6 flex items-center gap-4 border-b border-theme-gray-200 pb-6">
                    <div className="text-[56px] font-semibold text-theme-gray-700 leading-none">
                      {Number((reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length).toFixed(1))}
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => {
                          const avg = reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length;
                          return (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < Math.round(avg) ? 'fill-accent text-accent' : 'text-theme-gray-300'}`} 
                            />
                          );
                        })}
                      </div>
                      <div className="text-[13px] text-theme-gray-600">Average of <span className="font-semibold">{reviewsList.length}</span> reviews</div>
                    </div>
                  </div>

                  <div className="flex flex-col mb-8">
                    {reviewsList.map((review) => (
                      <div key={review.id} className="flex flex-col border-b border-theme-gray-200 py-6 first:pt-0 last:border-0 last:pb-0">
                        <span className="font-bold text-theme-gray-800 mb-2">{review.author}</span>
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-theme-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <div className="text-[13px] text-theme-gray-500 mb-3">
                          {review.date}
                        </div>
                        <p className="text-[14px] leading-relaxed text-theme-gray-500">
                          {review.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <ReviewDialog 
                  productId={product?._id}
                  productTitle={product?.title}
                  productImage={images[0]}
                  customTrigger={
                    <div className="flex items-center gap-2 rounded bg-theme-dark-blue px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-theme-dark-blue-hover cursor-pointer">
                      <Pencil className="h-3 w-3 fill-white" />
                      <span className="text-[11px] uppercase tracking-wide">
                        {reviewsList && reviewsList.length > 0 
                          ? "Write your review" 
                          : "Be the first to write your review!"}
                      </span>
                    </div>
                  }
                />
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
