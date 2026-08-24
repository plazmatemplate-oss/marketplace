import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/HeroSection";
import FeaturesBanner from "@/components/sections/FeaturesBanner";
import UltimateShowcases from "@/components/sections/UltimateShowcases";
import PromoBanner from "@/components/sections/PromoBanner";
import ProductGridSection from "@/components/common/ProductGridSection";

const TrustedExcellence = dynamic(() => import("@/components/sections/TrustedExcellence"));
const SupportBanner = dynamic(() => import("@/components/sections/SupportBanner"));

export const metadata: Metadata = {
  title: "Home | Plazma Themes",
  description: "Discover the best PrestaShop templates and modules to elevate your e-commerce store with Plazma Themes.",
  keywords: ["home", "Plazma Themes", "PrestaShop templates", "e-commerce modules", "premium themes"],
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col bg-white">
      <HeroSection />
      
      <FeaturesBanner />
      
      <UltimateShowcases />
      
      <PromoBanner />
      
      <ProductGridSection 
        title="Plazma Themes Best Selling Templates"
        subtitle="Unlock the power of top-performing templates with Plazma Themes. Crafted for excellence, these best sellers combine style, functionality, and high performance to elevate your online store."
        rows={2}
        pageSize={16}
        categoryFilter="watch-store"
        viewMoreLink="/best-sales"
        className='pb-0'
      />
      
      <ProductGridSection 
        title="Upgrade Your Store with These PrestaShop Modules"
        subtitle="Enhance your online store with essential modules that streamline operations and boost sales. Discover powerful tools to elevate your PrestaShop experience."
        rows={1}
        pageSize={10}
        categoryFilter="custom-modules"
        viewMoreLink='/custom-modules'
      />
      
      <ProductGridSection 
        title="Exquisite Design and Layout Masterpieces"
        subtitle="Unveil stunning designs and flawless layouts crafted for elegance and functionality. Transform your site with premium design solutions that captivate and engage your audience."
        rows={1}
        pageSize={8}
        categoryFilter="megashop-themes"
        viewMoreLink='/megashop-themes'
        isPadding={false}
      />
    
      <TrustedExcellence />

      <ProductGridSection 
        title="Ultimate Price Drops on Best Deals"
        subtitle="Take advantage of unbeatable price cuts on our top products. Grab the best deals before they're gone and save big on high-quality items!"
        rows={1}
        pageSize={8}
        categoryFilter="fashion-shoes"
        viewMoreLink="/prices-drop"
        isPadding={false}
      />
      
      <SupportBanner />
    </div>
  );
}
