import { Metadata } from 'next';
import SectionTitle from '@/components/common/SectionTitle';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Notice | Plazma Themes',
  description: 'Legal information and notices for Plazma Themes.',
  keywords: ['legal notice', 'legal information', 'Plazma Themes legal'],
  alternates: {
    canonical: '/legal-notice',
  },
};

export default function LegalNoticePage() {
  return (
    <div className="bg-white">

      <div
        className="hidden md:block w-full h-75 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("https://plazmathemes.com/modules/badhomebanner/views/img/demo_img_1.png")' }}
      >
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="page-overlap-container-short">
        <div className="w-full">
          <div className="page-card">

            <div className="mb-8">
              <SectionTitle 
                title="Legal Notice" 
                align="left" 
                as="h1" 
                uppercase={false} 
                className="items-start!" 
              />
            </div>

            <section className="mb-10">
              <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                <span>Legal</span>
              </h2>

              <div className="pl-3 border-l-2 border-theme-gray-100">
                <h3 className="text-[15px] font-semibold text-theme-gray-700 mb-3">Credits</h3>

                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[13px] font-semibold text-theme-gray-500 uppercase tracking-wide mb-1">
                      Concept and production:
                    </p>
                    <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                      This online store is powered by{' '}
                      <Link
                        href="https://www.prestashop.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline"
                      >
                        PrestaShop
                      </Link>
                      , a leading eCommerce platform designed to provide a seamless shopping
                      experience. For expert insights, tips, and the latest news on online selling
                      and eCommerce website management, visit the official{' '}
                      <Link
                        href="https://prestashop.com/blog/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary font-medium hover:underline"
                      >
                        PrestaShop blog.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
