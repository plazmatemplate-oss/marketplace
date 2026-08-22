import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function PromoBanner() {
  return (
    <section className="w-full bg-theme-dark-blue py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          
          <div className="lg:w-1/3 text-white text-left pl-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Build Your Ideal E-Commerce</h3>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">Site with</h3>
            <h2 className="text-[32px] sm:text-4xl md:text-5xl font-extrabold mb-6 tracking-wide wrap-break-word">PLAZMATHEMES</h2>
            
            <ul className="space-y-2 text-sm text-theme-gray-200">
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-theme-success before:text-lg before:leading-none before:mt-0.5">
                Advanced Customization Options
              </li>
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-theme-success before:text-lg before:leading-none before:mt-0.5">
                Supercharged Loading Speed for Smooth Browsing
              </li>
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-theme-success before:text-lg before:leading-none before:mt-0.5">
                Multi-Store Compatibility
              </li>
              <li className="flex items-start before:content-['•'] before:mr-2 before:text-theme-success before:text-lg before:leading-none before:mt-0.5">
                Comprehensive Support and Updates
              </li>
            </ul>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Card className="p-8 flex flex-col justify-between min-h-55">
              <div>
                <h3 className="text-2xl font-bold text-theme-gray-800 mb-2">Templates</h3>
                <p className="text-theme-gray-500 text-sm mb-4 leading-relaxed">
                  Transform Your Store with PrestaShop&apos;s Unique, Feature-Rich Template Designs
                </p>
                <div className="text-theme-error font-bold text-lg mb-1">
                  241 <span className="text-theme-gray-500 font-normal text-sm">items</span>
                </div>
                <div className="text-theme-gray-500 text-sm mb-6">
                  +0 added this week
                </div>
              </div>
              <Link href="/modules" className="bg-theme-purple text-white text-center py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity block w-full">
                View All
              </Link>
            </Card>

            <Card className="p-8 flex flex-col justify-between min-h-55">
              <div>
                <h3 className="text-2xl font-bold text-theme-gray-800 mb-2">Modules</h3>
                <p className="text-theme-gray-500 text-sm mb-4 leading-relaxed">
                  PrestaShop&apos;s Advanced Marketplace Module for Seamless E-Commerce Customization
                </p>
                <div className="text-theme-error font-bold text-lg mb-1">
                  39 <span className="text-theme-gray-500 font-normal text-sm">items</span>
                </div>
                <div className="text-theme-gray-500 text-sm mb-6">
                  +0 added this week
                </div>
              </div>
              <Link href="/modules" className="bg-theme-purple text-white text-center py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 transition-opacity block w-full">
                View All
              </Link>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
