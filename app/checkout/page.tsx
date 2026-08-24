import { Metadata } from 'next';
import SectionTitle from '@/components/common/SectionTitle';
import CheckoutContent from '@/components/checkout/CheckoutContent';

export const metadata: Metadata = {
  title: 'Checkout | Plazma Themes',
  description: 'Complete your purchase securely.',
  keywords: ["checkout", "secure payment", "buy template", "purchase theme"],
  alternates: {
    canonical: "/checkout",
  },
};

export default function CheckoutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div
        className="hidden md:block w-full h-100 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("/images/about-bg.png")' }}
      >
        <div className="absolute inset-0 bg-white/20" />
      </div>

      <div className="page-overlap-container-tall">
        <div className="mb-8 text-center md:text-left">
          <SectionTitle 
            title="Checkout" 
            align="left" 
            as="h1" 
            uppercase={false} 
            className="items-start! hidden md:flex" 
          />
          <SectionTitle 
            title="Checkout" 
            align="center" 
            as="h1" 
            uppercase={false} 
            className="md:hidden" 
          />
        </div>

        <CheckoutContent />
      </div>
    </div>
  );
}