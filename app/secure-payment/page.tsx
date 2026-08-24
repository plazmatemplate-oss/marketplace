import { Metadata } from 'next';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata: Metadata = {
  title: 'Secure Payment | Plazma Themes',
  description: 'Information about secure payments and transactions on Plazma Themes.',
  keywords: ["secure payment", "safe transactions", "payment methods", "SSL"],
  alternates: {
    canonical: "/secure-payment",
  },
};

export default function SecurePaymentPage() {
  return (
    <div className="bg-white">

      <div
        className="hidden md:block w-full h-75 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("/images/about-bg.png")' }}
      >
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="page-overlap-container-short">
        <div className="w-full">
          <div className="page-card">

            <div className="mb-8">
              <SectionTitle 
                title="Secure payment" 
                align="left" 
                as="h1" 
                uppercase={false} 
                className="items-start!" 
              />
            </div>

            <div className="space-y-8">

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  <span>Our secure payment</span>
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    With SSL
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  <span>Using Visa/Mastercard/Paypal</span>
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    About this service
                  </p>
                </div>
              </section>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}