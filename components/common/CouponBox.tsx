"use client";

import React from "react";
import { Tag, CheckCircle2, X, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Coupon } from "@/lib/coupons";

interface CouponBoxProps {
  couponInput: string;
  setCouponInput: (val: string) => void;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  errorMsg: string | null;
  applyCoupon: (code?: string) => void;
  removeCoupon: () => void;
  className?: string;
}

export default function CouponBox({
  couponInput,
  setCouponInput,
  appliedCoupon,
  discountAmount,
  errorMsg,
  applyCoupon,
  removeCoupon,
  className = "",
}: CouponBoxProps) {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyCoupon();
  };

  return (
    <div className={`flex flex-col gap-3 py-3 border-t border-b border-theme-gray-100 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-bold text-theme-dark-blue flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-primary" />
          <span>Promo / Coupon Code</span>
        </label>
        {appliedCoupon && (
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Applied
          </span>
        )}
      </div>

      {appliedCoupon ? (
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-lg p-3 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-col text-left min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-[14px] text-emerald-700 tracking-wider">
                {appliedCoupon.code}
              </span>
              <span className="text-[11px] font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded-sm">
                {appliedCoupon.discountType === "percentage" ? `${appliedCoupon.discountValue}% OFF` : `€${appliedCoupon.discountValue} OFF`}
              </span>
            </div>
            <span className="text-[12px] text-emerald-800/80 font-medium truncate mt-0.5">
              Saved €{discountAmount.toFixed(2)} ({appliedCoupon.description})
            </span>
          </div>

          <button
            type="button"
            onClick={removeCoupon}
            className="p-1.5 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-900 rounded-full transition-colors shrink-0 cursor-pointer"
            title="Remove Coupon"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Input
              type="text"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              placeholder="e.g. PLAZMA50"
              className="bg-white border-theme-gray-200 h-10 text-[13px] font-mono tracking-wider uppercase rounded-sm flex-1 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
            />
            <Button
              type="submit"
              disabled={!couponInput.trim()}
              className="h-10 px-4 text-[13px] font-bold bg-theme-dark-blue hover:bg-theme-dark-blue-hover text-white rounded-sm shrink-0 cursor-pointer disabled:opacity-50"
            >
              Apply
            </Button>
          </div>

          {errorMsg && (
            <p className="text-[12px] text-theme-error font-medium leading-tight">
              {errorMsg}
            </p>
          )}

          {/* Available Coupon Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] text-theme-gray-500 font-medium">Use Code:</span>
            <button
              type="button"
              onClick={() => {
                setCouponInput("PLAZMA50");
                applyCoupon("PLAZMA50");
              }}
              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-300/70 px-2 py-0.5 rounded transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              PLAZMA50 (50% OFF)
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
