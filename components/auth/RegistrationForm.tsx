"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRegisterMutation } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

const registrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().optional(),
  email: z.string().min(1, 'Email is required').pipe(z.email('Invalid email format')),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  terms: z.any().refine(val => val === true, 'You must agree to the terms and conditions'),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = (data: RegistrationFormValues) => {
    const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');

    registerMutation.mutate(
      {
        name: fullName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (res) => {
          toast.success(`Account created successfully! Welcome ${res.name}!`);
          router.push('/');
        },
        onError: (err) => {
          toast.error(err.message || 'Registration failed. Please try again.');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">First name</Label>
        <div className="flex-1 flex flex-col gap-1.5">
          <Input
            {...register('firstName')}
            placeholder="John"
            className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none"
          />
          {errors.firstName && <p className="text-theme-error text-xs">{errors.firstName.message}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">
          {"Last name"}
          <span className="block text-[11px] text-theme-gray-400 font-normal">Optional</span>
        </Label>
        <div className="flex-1 flex flex-col gap-1.5">
          <Input
            {...register('lastName')}
            placeholder="Doe"
            className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none"
          />
          {errors.lastName && <p className="text-theme-error text-xs">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">Email</Label>
        <div className="flex-1 flex flex-col gap-1.5">
          <Input
            type="text"
            {...register('email')}
            placeholder="your@email.com"
            className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none"
          />
          {errors.email && <p className="text-theme-error text-xs">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">Password</Label>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              placeholder="••••••••"
              className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-gray-400 hover:text-theme-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-theme-error text-xs">{errors.password.message}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <div className="sm:w-1/4" />
        <div className="flex-1 flex flex-col gap-1.5">
          <Label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              {...register('terms')}
              className="mt-0.5 w-4 h-4 rounded-sm border border-theme-gray-300 text-primary accent-primary shrink-0"
            />
            <span className="text-[13px] text-theme-gray-600 leading-snug">
              I agree to the{' '}
              <Link href="/termsandconditions" className="text-primary hover:underline">terms and conditions</Link>
              {' '}and the{' '}
              <Link href="/privacy-policy" className="text-primary hover:underline">privacy policy</Link>
            </span>
          </Label>
          {errors.terms && <p className="text-theme-error text-xs">{errors.terms.message as string}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
        <div className="sm:w-1/4" />
        <div className="flex-1">
          <Button 
            type="submit" 
            disabled={registerMutation.isPending}
            className="w-full sm:w-auto px-8 shadow-md flex items-center gap-2"
          >
            {registerMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {registerMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>
    </form>
  );
}
