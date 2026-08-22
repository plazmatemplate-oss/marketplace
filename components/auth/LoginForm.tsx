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
import { useLoginMutation } from '@/hooks/useAuth';
import { toast } from '@/components/ui/sonner';

const loginSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).pipe(z.email({ message: 'Invalid email format' })),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        toast.success(`Welcome back, ${res.name || 'User'}!`);
        router.push('/');
      },
      onError: (err) => {
        const errMsg = err.message || 'Login failed. Please check your credentials.';
        toast.error(errMsg);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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

      {/* <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <div className="sm:w-1/4" />
        <div className="flex-1">
          <Link href="/password-recovery" className="text-[13px] text-theme-gray-600 hover:text-theme-gray-900 hover:underline">
            Forgot your password?
          </Link>
        </div>
      </div> */}

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
        <div className="sm:w-1/4" />
        <div className="flex-1">
          <Button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full sm:w-auto px-8 shadow-md flex items-center gap-2"
          >
            {loginMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>
      </div>
    </form>
  );
}
