"use client";

import { useState, useEffect, useCallback } from "react";
import { validateCoupon, Coupon, ValidationResult } from "@/lib/coupons";
import { toast } from "@/lib/toast";

const STORAGE_KEY = "plazma_applied_coupon";

export function useCoupon(subtotal: number) {
  const [couponInput, setCouponInput] = useState<string>("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state on initial load from sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCode = sessionStorage.getItem(STORAGE_KEY);
      if (savedCode && subtotal > 0) {
        const res = validateCoupon(savedCode, subtotal);
        if (res.valid && res.coupon) {
          setAppliedCoupon(res.coupon);
          setCouponInput(res.coupon.code);
          setDiscountAmount(res.discountAmount);
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, [subtotal]);

  // Recalculate discount when subtotal updates
  useEffect(() => {
    if (appliedCoupon && subtotal > 0) {
      const res = validateCoupon(appliedCoupon.code, subtotal);
      if (res.valid) {
        setDiscountAmount(res.discountAmount);
      } else {
        setAppliedCoupon(null);
        setDiscountAmount(0);
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    }
  }, [subtotal, appliedCoupon]);

  const applyCoupon = useCallback((codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim();
    setErrorMsg(null);

    const result: ValidationResult = validateCoupon(code, subtotal);

    if (!result.valid) {
      setErrorMsg(result.message);
      toast.error(result.message);
      return false;
    }

    if (result.coupon) {
      setAppliedCoupon(result.coupon);
      setDiscountAmount(result.discountAmount);
      setCouponInput(result.coupon.code);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(STORAGE_KEY, result.coupon.code);
      }
      toast.success(result.message);
      return true;
    }
    return false;
  }, [couponInput, subtotal]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponInput("");
    setErrorMsg(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
    toast.info("Coupon code removed.");
  }, []);

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return {
    couponInput,
    setCouponInput,
    appliedCoupon,
    discountAmount,
    finalTotal,
    errorMsg,
    applyCoupon,
    removeCoupon,
  };
}
