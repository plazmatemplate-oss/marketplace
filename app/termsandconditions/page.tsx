import { Metadata } from 'next';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Plazma Themes',
  description: 'Terms of service and conditions for using Plazma Themes.',
  keywords: ["terms and conditions", "TOS", "terms of service", "user agreement"],
  alternates: {
    canonical: "/termsandconditions",
  },
};

export default function TermsAndConditionsPage() {
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
                title="Terms & Conditions" 
                align="left" 
                as="h1" 
                uppercase={false} 
                className="items-start!" 
              />
            </div>

            <div className="space-y-8">
              <p className="text-[15px] text-theme-gray-600 leading-relaxed">
                Welcome to Plazma Themes! Before using our website or purchasing any of our products and services, we kindly ask all visitors and clients to carefully review our Terms and Conditions.
              </p>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {"1. General Overview"}
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    By accessing, purchasing, or using any products and services available on the Plazma Themes website, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {"2. License Agreement"}
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100 space-y-4">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Plazma Themes grants licenses that govern the use of its products and services. Under these licenses, Plazma Themes retains ownership while granting users the right to customize the products to suit their needs.
                  </p>
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Customers will receive a License Certificate, which remains valid until the customer discontinues use of the product or the license is terminated due to a breach of these Terms and Conditions. Each License Certificate includes a unique license serial, which is valid for installation on a single store only.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {"3. Technical Support"}
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100 space-y-4">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    As per our Support Policy, Plazma Themes provides general support for purchased products and services for a period of six (6) months. This support excludes installation or product modifications, which are not covered under general or extended support terms.
                  </p>
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    For additional assistance with installation or customization, clients may use our Service Center for an additional fee. Please note that free themes are not eligible for support services.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {"4. Refund Policy"}
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100 space-y-4">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    We offer a 14-day money-back guarantee for all our products. If you are not fully satisfied with a product within 14 days of purchase, you are eligible for a full refund. However, after a refund, you must discontinue using the product on any domain, including live sites.
                  </p>
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    It is recommended to review the product demo thoroughly before making a purchase, as refunds for missing features not included in the product will not be accepted.
                  </p>
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    In cases of website, store, or theme conflicts, customers must provide adequate time and information for issue resolution. Failure to cooperate may result in a denial of refund requests.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {"5. Product Updates"}
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Plazma Themes regularly updates its products to accommodate customer requests and ensure compatibility with the latest platform versions. Customers who have purchased a product are entitled to receive updated versions. Stay informed about updates by following our blog or subscribing to our newsletter.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {"6. Changes to the Terms and Conditions"}
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Plazma Themes reserves the right to modify these Terms and Conditions at any time without prior notice. We encourage users to review this page regularly before using the website or purchasing any of our products.
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