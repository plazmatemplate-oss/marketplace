import SectionTitle from '@/components/common/SectionTitle';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "About Us | Plazma Themes",
  description: "Learn more about Plazma Themes Template, a marketplace built on trust and innovation.",
  keywords: ["about Plazma Themes", "marketplace team", "ecommerce innovation", "PrestaShop experts"],
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white">

      <section
        className="relative w-full overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat section-padding"
        style={{ backgroundImage: 'url("/images/about-bg.png")' }}
      >
        <div className="absolute inset-0 bg-white/20 -z-10"></div>

        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-theme-gray-800 mb-6 tracking-tight">
              A Marketplace Built on Trust and Innovation
            </h1>
            <p className="text-[15px] md:text-[16px] text-theme-gray-600 leading-relaxed max-w-3xl mx-auto">
              At <span className="font-semibold text-primary">Plazma Themes Template</span>, we bring together diverse sellers and passionate buyers under one digital roof, creating a vibrant marketplace where quality, variety, and value come together seamlessly. Our platform is designed to connect you with unique products across categories, including Fashion, Mega Electronics Store, Sports & activities, Healthcare, Beauty & Ceramic, Food Store, Artcraft etc. all curated to meet your needs and preferences.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            <div className="relative lg:sticky lg:top-32 self-start">
              <Image
                src="/images/about/about.png"
                alt="About Plazma Themes Template"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-6 lg:pr-8">
              <SectionTitle
                preTitle="Where Your Shopping Journey Begins and Opportunities Grow"
                title="Where Possibilities Meet Convenience"
                align="left"
              />
              <p className="text-[15px] text-theme-gray-600 leading-relaxed">
                Welcome to <span className="font-semibold text-primary">Plazma Themes Template</span>, a vibrant online destination where buyers and sellers come together to create something extraordinary. Whether you&apos;re here to shop for unique products or share your offerings with the world, Plazma Themes Template is designed to make every interaction seamless, secure, and rewarding.
              </p>

              <div className="flex flex-col gap-4 mt-2">
                <h3 className="text-[17px] font-bold text-theme-gray-800">What We Offer:</h3>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 mt-1.5 bg-primary rotate-45 shrink-0"></div>
                  <p className="text-[15px] text-theme-gray-600 leading-relaxed"><span className="font-semibold text-theme-gray-800">A Diverse Marketplace:</span> Explore a wide range of products that cater to every need and passion.</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 mt-1.5 bg-primary rotate-45 shrink-0"></div>
                  <p className="text-[15px] text-theme-gray-600 leading-relaxed"><span className="font-semibold text-theme-gray-800">Trusted Community:</span> Join a network of verified sellers and loyal buyers.</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 mt-1.5 bg-primary rotate-45 shrink-0"></div>
                  <p className="text-[15px] text-theme-gray-600 leading-relaxed"><span className="font-semibold text-theme-gray-800">Effortless Experience:</span> Seamless browsing, secure transactions, and fast delivery.</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-[17px] font-bold text-theme-gray-800 mb-3">What Drives Us</h3>
                <p className="text-[15px] text-theme-gray-600 leading-relaxed">
                  We believe in connecting communities through innovation and trust. Whether you&apos;re hunting for a unique item or expanding your business reach, Plazma Themes Template is your partner in achieving your goals.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-[17px] font-bold text-theme-gray-800">Why Plazma Themes Template?</h3>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 mt-1.5 bg-primary rotate-45 shrink-0"></div>
                  <p className="text-[15px] text-theme-gray-600 leading-relaxed"><span className="font-semibold text-theme-gray-800">User-Friendly Platform:</span> Designed with you in mind for smooth navigation and transactions.</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 mt-1.5 bg-primary rotate-45 shrink-0"></div>
                  <p className="text-[15px] text-theme-gray-600 leading-relaxed"><span className="font-semibold text-theme-gray-800">Exclusive Deals:</span> Shop smarter with unbeatable prices and offers.</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 mt-1.5 bg-primary rotate-45 shrink-0"></div>
                  <p className="text-[15px] text-theme-gray-600 leading-relaxed"><span className="font-semibold text-theme-gray-800">Exceptional Support:</span> Our dedicated team ensures your experience is smooth and satisfying.</p>
                </div>
              </div>

              <p className="text-[15px] text-theme-gray-600 leading-relaxed mt-6 italic">
                Step into a world of possibilities with <span className="font-semibold text-primary">Plazma Themes Template</span>, where your journey of discovery and growth awaits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto">
          <div className="bg-theme-light-blue rounded-[40px] px-8 py-16 lg:p-20 flex flex-col gap-16 lg:gap-20 shadow-sm border border-theme-light-blue/50">

            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start max-w-5xl mx-auto">
              <div className="w-32 h-32 lg:w-40 lg:h-40 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Image src="/images/about/Support.png" alt="Support" width={80} height={80} className="w-16 h-16 lg:w-20 lg:h-20 object-contain" />
              </div>
              <div className="flex flex-col gap-4 text-center md:text-left pt-2 lg:pt-6">
                <h3 className="text-2xl lg:text-[26px] font-bold text-theme-gray-800">Support That Never Sleeps</h3>
                <p className="text-[15px] lg:text-[16px] text-theme-gray-600 leading-relaxed">
                  At <span className="font-semibold text-primary">Plazma Themes Template</span>, support isn&apos;t just a serviceâ€”it&apos;s our commitment to you. Whether you&apos;re a buyer seeking assistance or a seller with queries, our dedicated team is here to ensure a smooth and stress-free experience. With responsive communication, detailed guidance, and proactive solutions, we go the extra mile to keep you satisfied. Trust us to have your back every step of the way, because your success is our priority.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start max-w-5xl mx-auto">
              <div className="w-32 h-32 lg:w-40 lg:h-40 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Image src="/images/about/Customization.png" alt="Personalization" width={80} height={80} className="w-16 h-16 lg:w-20 lg:h-20 object-contain" />
              </div>
              <div className="flex flex-col gap-4 text-center md:text-left pt-2 lg:pt-6">
                <h3 className="text-2xl lg:text-[26px] font-bold text-theme-gray-800">Personalized Perfection at Every Step</h3>
                <p className="text-[15px] lg:text-[16px] text-theme-gray-600 leading-relaxed">
                  We understand that one size doesn&apos;t fit all. That&apos;s why <span className="font-semibold text-primary">Plazma Themes Template</span> offers tailored solutions to meet your unique needs. From personalized recommendations to flexible selling options, our platform adapts to suit your goals. Whether you&apos;re browsing or building your brand, customization is at the core of what we doâ€”because your individuality deserves to shine.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start max-w-5xl mx-auto">
              <div className="w-32 h-32 lg:w-40 lg:h-40 shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm">
                <Image src="/images/about/Innovation.png" alt="Innovation" width={80} height={80} className="w-16 h-16 lg:w-20 lg:h-20 object-contain" />
              </div>
              <div className="flex flex-col gap-4 text-center md:text-left pt-2 lg:pt-6">
                <h3 className="text-2xl lg:text-[26px] font-bold text-theme-gray-800">Innovation at the Heart of Progress</h3>
                <p className="text-[15px] lg:text-[16px] text-theme-gray-600 leading-relaxed">
                  At <span className="font-semibold text-primary">Plazma Themes Template</span>, we embrace the power of innovation to shape a better shopping and selling experience. Our platform is constantly evolving with the latest technology, offering seamless navigation, secure transactions, and forward-thinking solutions. We&apos;re not just keeping up with trendsâ€”We&apos;re setting them, ensuring that you stay ahead in a world of endless possibilities.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
