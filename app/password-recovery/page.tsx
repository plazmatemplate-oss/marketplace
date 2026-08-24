import { Metadata } from 'next';
import PasswordRecoveryForm from '@/components/auth/PasswordRecoveryForm';
import GuestGuard from '@/components/auth/GuestGuard';
import SectionTitle from '@/components/common/SectionTitle';

export const metadata: Metadata = {
  title: 'Forgot Password | Plazma Themes',
  description: 'Reset your Plazma Themes account password.',
  keywords: ["password recovery", "reset password", "forgot password", "Plazma Themes account"],
  alternates: {
    canonical: "/password-recovery",
  },
};

export default function PasswordRecoveryPage() {
  return (
    <GuestGuard>
      <div className="bg-white">
        <div
          className="hidden md:block w-full h-75 bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: 'url("/images/about-bg.png")' }}
        >
          <div className="absolute inset-0 bg-white/20" />
        </div>

        <div className="page-overlap-container-short">
          <div className="max-w-3xl mx-auto">
            <div className="page-card">
              <div className="mb-6">
                <SectionTitle 
                  title="Forgot your password?" 
                  align="left" 
                  as="h1" 
                  uppercase={false} 
                  className="items-start!" 
                />
              </div>
              <PasswordRecoveryForm />
            </div>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
