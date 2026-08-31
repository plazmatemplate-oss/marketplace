export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 50 for 50%, 15 for €15
  description: string;
  minSpend?: number;
}

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: "PLAZMA50",
    discountType: "percentage",
    discountValue: 50,
    description: "50% off on any theme & module purchase",
  },
  // {
  //   code: "PLAZMA20",
  //   discountType: "percentage",
  //   discountValue: 20,
  //   description: "20% off storewide discount",
  // },
  // {
  //   code: "WELCOME10",
  //   discountType: "percentage",
  //   discountValue: 10,
  //   description: "10% off welcome discount",
  // },
  // {
  //   code: "FLAT15",
  //   discountType: "fixed",
  //   discountValue: 15,
  //   description: "€15 flat discount on order total",
  // },
];

export interface ValidationResult {
  valid: boolean;
  message: string;
  discountAmount: number;
  coupon?: Coupon;
}

export function validateCoupon(code: string, subtotal: number): ValidationResult {
  const cleanCode = code.trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, message: "Please enter a coupon code.", discountAmount: 0 };
  }

  const coupon = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
  if (!coupon) {
    return { valid: false, message: "Invalid coupon code. Try PLAZMA50 for 50% OFF!", discountAmount: 0 };
  }

  if (coupon.minSpend && subtotal < coupon.minSpend) {
    return {
      valid: false,
      message: `Minimum order amount of €${coupon.minSpend.toFixed(2)} required for code ${coupon.code}.`,
      discountAmount: 0,
    };
  }

  let discountAmount = 0;
  if (coupon.discountType === "percentage") {
    discountAmount = (subtotal * coupon.discountValue) / 100;
  } else {
    discountAmount = Math.min(coupon.discountValue, subtotal);
  }

  return {
    valid: true,
    message: `Coupon "${coupon.code}" applied successfully! You saved €${discountAmount.toFixed(2)}.`,
    discountAmount,
    coupon,
  };
}
