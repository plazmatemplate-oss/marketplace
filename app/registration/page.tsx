import { Metadata } from 'next';
import Link from 'next/link';
import RegistrationForm from '@/components/auth/RegistrationForm';
import GuestGuard from '@/components/auth/GuestGuard';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata: Metadata = {
  title: 'Register | Plazma Themes',
  description: 'Create a new Plazma Themes account.',
  keywords: ["create Plazma Themes account", "register for templates", "new account", "sign up"],
  alternates: {
    canonical: "/registration",
  },
};

export default function RegistrationPage() {
  return (
    <GuestGuard>
      <div className="bg-white">
        <div
          className="hidden md:block w-full h-100 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: 'url("/images/about-bg.png")' }}
        >
          <div className="absolute inset-0 bg-white/20" />
        </div>

        <div className="page-overlap-container-tall">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

            <div className="w-full lg:w-5/12 flex flex-col gap-6 pt-4">
              <SectionTitle 
                title="Already have an account?" 
                align="left" 
                as="h1" 
                uppercase={false} 
                className="items-start!" 
              />
              <p className="text-theme-gray-600 text-[14.5px] leading-relaxed max-w-lg">
                If you already have an account with us, click the button below to log in and access your account:
              </p>
              <div>
                <Link
                  href="/login"
                  className="bg-(image:--theme-background-gradiant) text-white px-8 py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 shadow-md transition-opacity inline-block"
                >
                  Log In Instead!
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="page-card">
                <RegistrationForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
