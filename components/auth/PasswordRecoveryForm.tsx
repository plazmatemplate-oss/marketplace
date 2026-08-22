"use client";

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ChevronLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const recoverySchema = z.object({
  email: z.string().min(1, 'Email is required').pipe(z.email('Invalid email format')),
});

type RecoveryFormValues = z.infer<typeof recoverySchema>;

export default function PasswordRecoveryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<RecoveryFormValues>({
    resolver: zodResolver(recoverySchema),
  });

  const onSubmit = (data: RecoveryFormValues) => {
    console.log('Password recovery submitted:', data);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-theme-gray-100 pb-4">
        <h1 className="text-[18px] font-bold text-theme-dark-blue">Forgot your password?</h1>
      </div>

      {isSubmitSuccessful ? (
        <div className="py-6 text-center">
          <p className="text-[14px] text-theme-gray-600 leading-relaxed">
            If an account with that email exists, a temporary link to reset your password has been sent.
          </p>
        </div>
      ) : (
        <>
          <p className="text-[14px] text-theme-gray-500 leading-relaxed">
            Please enter the email address you used to register. You will receive a temporary link to reset your password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
              <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">
                Email<br />
                <span className="font-normal text-theme-gray-500">address</span>
              </Label>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex gap-3">
                  <Input
                    type="text"
                    {...register('email')}
                    placeholder="your@email.com"
                    className="flex-1 bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none"
                  />
                  <Button type="submit" className="px-6 shadow-md whitespace-nowrap">
                    Send Reset Link
                  </Button>
                </div>
                {errors.email && <p className="text-theme-error text-xs">{errors.email.message}</p>}
              </div>
            </div>
          </form>
        </>
      )}

      <div className="pt-2">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-[13px] text-theme-gray-600 border border-theme-gray-200 px-4 py-2 rounded-sm hover:border-theme-gray-300 hover:text-theme-gray-900 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
