"use client";
import Image from "next/image";

export default function TrustedExcellence() {
  return (
    <section className="section-padding text-center">
      <div className="container mx-auto">
        <div className="bg-white rounded-tl-[80px] rounded-br-[80px] p-8 md:p-12 relative overflow-hidden shadow-md mx-auto w-full">
        
        <div className="absolute top-0 left-0 w-32 h-32 bg-theme-light-blue rounded-br-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-theme-light-blue rounded-tl-[100px] -z-10"></div>

        <div className="flex justify-center mb-6">
          <Image 
            src="https://plazmathemes.com/modules/badaboutus/views/img/demo_img_1.png" 
            alt="Prestashop Superhero Mascot" 
            width={200}
            height={128}
            className="h-32 w-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        <h2 className="text-2xl md:text-[28px] font-bold text-theme-dark-blue uppercase tracking-wide mb-8">
          Certified PrestaShop Themes & Templates – Trusted Excellence
        </h2>

        <div className="max-w-3xl mx-auto space-y-5 text-[15px] text-theme-gray-500 leading-relaxed">
          <p>
            Searching for the ideal PrestaShop theme to boost your online store&apos;s design and performance?<br/>
            Look no further than <strong className="text-theme-gray-800">Plazma themes</strong>, the trusted official partner for PrestaShop <strong className="text-transparent bg-clip-text bg-(image:--theme-background-gradiant)">themes and templates!</strong>
          </p>

          <p>
            They provide top-tier <strong className="text-theme-gray-800">e-commerce templates</strong> tailored to industries such as<br/>
            Mega Electronics Store, Fashion, Organic , Grocery Store, Food & Restaurant, Artcraft, Handmade, Shoes, Jewellery,<br/>
            Book, Autoparts & Automotive, Health & Beauty, Home Decore & Furnirure, and Sports & Activities, Home Appliances.
          </p>

          <p>
            Their commitment to quality has made them a trusted name for delivering exceptional themes and templates.
          </p>

          <p>
            Their <strong className="text-theme-gray-800">expert support</strong> team is always ready to help, <strong className="text-theme-gray-800">providing 24/7 assistance</strong> for any challenges you might face. Trust<br/>
            <strong className="text-transparent bg-clip-text bg-(image:--theme-background-gradiant)">Plazma themes</strong> for all your PrestaShop theme needs and watch your online store thrive.
          </p>
        </div>

        </div>
      </div>
    </section>
  );
}
