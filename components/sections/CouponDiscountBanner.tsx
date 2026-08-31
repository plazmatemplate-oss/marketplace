'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Sparkles, ArrowRight, Percent } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CouponDiscountBannerProps {
  code?: string;
  discountText?: string;
}

export default function CouponDiscountBanner({
  code = "PLAZMA50",
  discountText = "50% OFF"
}: CouponDiscountBannerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(`Coupon code "${code}" copied to clipboard!`);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="w-full relative overflow-hidden py-10 md:py-14 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-y border-indigo-800/40 shadow-xl">
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-400/30 text-amber-300 text-xs md:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>SPECIAL PROMOTION • LIMITED TIME OFFER</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Get <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">{discountText}</span> On Any Theme Purchase!
            </h2>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Elevate your e-commerce store with our premium PrestaShop themes. Apply our free coupon code during checkout to get an instant 50% discount on your order.
            </p>
          </div>

          {/* Right Coupon Card Box */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 justify-center">
            
            {/* Ticket Box */}
            <div className="relative group bg-slate-900/90 border-2 border-dashed border-pink-500/50 hover:border-pink-400 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 shadow-lg hover:shadow-pink-500/10 w-full sm:w-auto">
              
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Percent className="w-6 h-6" />
              </div>

              <div className="flex flex-col text-left pr-2">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  Free Coupon Code
                </span>
                <span className="font-mono font-extrabold text-xl sm:text-2xl text-amber-300 tracking-wider">
                  {code}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="ml-auto sm:ml-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-pink-600 text-white font-medium text-xs sm:text-sm transition-all duration-200 active:scale-95"
                title="Copy Coupon Code"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-300 group-hover:text-white" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Action CTA Link */}
            <Link
              href="/best-sales"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-600/30 hover:shadow-pink-600/50 transition-all duration-200 active:scale-95 w-full sm:w-auto text-center whitespace-nowrap"
            >
              <span>Shop Themes Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}
