import { Metadata } from 'next';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata: Metadata = {
  title: 'Privacy Policy | Plazma Themes',
  description: 'How we handle your data and privacy at Plazma Themes.',
  keywords: ["privacy policy", "data privacy", "user data", "Plazma Themes privacy"],
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
                title="Privacy Policy" 
                align="left" 
                as="h1" 
                uppercase={false} 
                className="items-start!" 
              />
            </div>

            <div className="space-y-8">
              <p className="text-[15px] text-theme-gray-600 leading-relaxed">
                At Plazma Themes, safeguarding your personal data is of utmost importance. We are committed to ensuring that all personal information, including your name, address, email, or phone number, is processed in compliance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
              </p>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {' '}
                  1. General Overview
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    This privacy policy aims to inform users about the types of personal data we collect, how we process it, and for what purposes. It also outlines the rights of our website visitors regarding their data. As the data controller and processor, Plazma Themes has implemented comprehensive technical and organizational measures to protect your information when using our website. However, please note that data transmitted over the internet may have vulnerabilities, and absolute protection cannot be guaranteed. Users may share personal data with us through various means, such as email or phone communications.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {' '}
                  2. Collection of Personal Information
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100 space-y-4">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Plazma Themes may gather and utilize the following personal information:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-[14.5px] text-theme-gray-600 leading-relaxed">
                    <li>Name, username, email address, phone numbers, physical address, and other contact details of users.</li>
                    <li>Details about devices used to access and interact with our website, including browser type, referral source, and IP address.</li>
                    <li>Responses to surveys, payment and billing information, transaction history, support queries, web analytics data, and any information submitted through website forms.</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {' '}
                  3. Methods of Data Collection
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100 space-y-4">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Plazma Themes collects data when users interact with our website through actions such as registration, placing orders, submitting feedback, participating in surveys or contests, or contacting us via available channels.
                  </p>
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    When users provide their email address, they consent to receiving notifications about their orders, newsletters, special offers, and advertisements for our products through various platforms (e.g., Facebook, Google Ads). We ensure that your email is never shared or used inappropriately.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {' '}
                  4. Security Measures
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100 space-y-4">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    We employ strict security measures to protect your personal information from unauthorized access, misuse, accidental loss, or destruction.
                  </p>
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Users are responsible for maintaining the security of their login credentials and should not share them with others. If you choose to share personal information on third-party websites, review their privacy policies for further clarity on data protection.
                  </p>
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Plazma Themes takes reasonable technical and organizational precautions to prevent data loss, alteration, or misuse.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {' '}
                  5. Disclosure of Personal Information
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Personal data may be accessed by authorized employees of Plazma Themes or third parties who require it for legitimate purposes. These third parties are obligated to handle your data under the terms of this privacy policy.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[17px] font-bold text-theme-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-(image:--theme-background-gradiant) rounded-full inline-block" />
                  {' '}
                  6. Changes to Our Privacy Policy
                </h2>
                <div className="pl-3 border-l-2 border-theme-gray-100">
                  <p className="text-[14.5px] text-theme-gray-600 leading-relaxed">
                    Plazma Themes acts as both a data controller and processor. We reserve the right to revise this privacy policy. Users are encouraged to review this page regularly to stay informed about updates. By continuing to use our site or purchase our services, you agree to the terms of the updated privacy policy.
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