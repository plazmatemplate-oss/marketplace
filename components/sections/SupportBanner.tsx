"use client";
import Image from "next/image";

export default function SupportBanner() {
  return (
    <section className="section-margin">
      <div className="container mx-auto">
        <div 
          className="w-full bg-(image:--theme-background-gradiant) rounded-xl flex flex-col items-center justify-center text-white py-16 px-4 min-h-87.5 shadow-md"
        >
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
          
          <Image 
            src="https://plazmathemes.com/modules/badbackgroundimages/views/img/demo_img_1.png" 
            alt="Support Teams Badge" 
            width={160}
            height={48}
            className="h-10 md:h-12 w-auto object-contain mb-6"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />

          <h2 className="text-3xl md:text-[40px] font-semibold mb-4 leading-tight drop-shadow-sm">
            The WorldClass 24/7<br/>Customer Support
          </h2>
          
          <p className="text-sm md:text-[15px] mb-8 leading-relaxed max-w-xl text-white/90 drop-shadow-sm">
            To help you with any queries or concerns, this theme includes months of dependable and helpful customer service.
          </p>

          <Image 
            src="https://plazmathemes.com/modules/badbackgroundimages/views/img/demo_img_2.png" 
            alt="5 Stars Rating" 
            width={160}
            height={48}
            className="h-10 md:h-12 w-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />

        </div>
        </div>
      </div>
    </section>
  );
}
