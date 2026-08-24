"use client";
import Image from "next/image";

export default function SupportBanner() {
  return (
    <section className="section-margin">
      <div className="container mx-auto"> 
        <div
          className="group w-full bg-(image:--theme-background-gradiant) rounded-xl flex flex-col items-center justify-center text-white py-16 px-4 min-h-87.5 shadow-md bg-[url('/images/home/customer-support-small.jpg')] lg:bg-[url('/images/home/customer-support.png')] bg-size-[100%_100%] bg-center bg-no-repeat overflow-hidden min-h-[680px] sm:min-h-[800px] md:min-h-[748px] lg:min-h-[450px] xl:min-h-[583px]"
        >
          <div className="animate-sweep absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.12)_60%,transparent_100%)] opacity-0 origin-center pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">

            <Image
              src="/images/home/customer-client.png"
              alt="Support Teams Badge"
              width={160}
              height={50}
              className="h-11 sm:h-12.5 lg:h-15 w-auto object-contain mb-6"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

            <h2 className="text-3xl md:text-[40px] font-semibold mb-4 leading-tight drop-shadow-sm">
              The WorldClass 24/7<br />Customer Support
            </h2>

            <p className="text-sm md:text-[15px] mb-8 leading-relaxed max-w-xl text-white/90 drop-shadow-sm">
              To help you with any queries or concerns, this theme includes months of dependable and helpful customer service.
            </p>

            <Image
              src="/images/home/customer-review.png"
              alt="5 Stars Rating"
              width={160}
              height={48}
              className="h-19 sm:h-21 w-auto object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />

          </div>
        </div>
      </div>
    </section>
  );
}
