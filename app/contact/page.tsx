import React from 'react';
import { Metadata } from 'next';
import { MapPin, Mail } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import SectionTitle from '@/components/common/SectionTitle';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: "Contact Us | Plazma Themes",
  description: "Get in touch with Plazma Themes for support, inquiries, or any other questions. We're here to help!",
  keywords: ["contact Plazma Themes", "PrestaShop support", "template support", "ecommerce theme inquiries"],
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div 
        className="hidden md:block w-full h-100 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: 'url("/images/about-bg.png")' }}
      >
        <div className="absolute inset-0 bg-white/20"></div>
      </div>

      <div className="page-overlap-container-tall">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          
          <div className="w-full lg:w-5/12 flex flex-col gap-6 pt-4">
            <SectionTitle 
              title="Have a question?" 
              align="left" 
              as="h1" 
              uppercase={false} 
              className="items-start!" 
            />
            <p className="text-theme-gray-600 text-[14.5px] leading-relaxed relative max-w-lg">
              Feel free to contact us if you have any questions or need assistance. Our team is always here to help with any inquiries you may have. We aim to respond promptly and ensure all your concerns are addressed. Thank you for reaching out to us!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              
              <Card className="p-4 md:p-6 flex flex-col gap-4">
                <div className="w-10 h-10 border border-theme-gray-200 rounded flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-theme-dark-blue" />
                </div>
                <p className="text-[14px] text-theme-gray-600 leading-relaxed">
                  UK - 56, Parkside Way, Ha26dg, United Kingdom
                </p>
              </Card>

              <Card className="p-4 md:p-6 flex flex-col gap-4">
                <div className="w-10 h-10 border border-theme-gray-200 rounded flex items-center justify-center">
                  <Mail className="w-5 h-5 text-theme-dark-blue" />
                </div>
                <div className="text-[14px] text-theme-gray-600 leading-relaxed">
                  <p>For general inquiries or support, email us at:</p>
                  <p className="text-primary font-medium mt-1 hover:underline cursor-pointer">
                    plazmatemplate@gmail.com
                  </p>
                </div>
              </Card>

            </div>
          </div>


          <div className="w-full lg:w-7/12">
            <Card className="p-4 sm:p-8 lg:p-12">
              <ContactForm />
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
