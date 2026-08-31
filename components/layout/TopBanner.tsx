import React from "react";

export default function TopBanner() {
  return (
    <div className="w-full bg-(image:--theme-background-gradiant) py-2 px-4 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 max-w-7xl mx-auto">
        <span className="bg-yellow-400 text-slate-900 font-extrabold text-xs sm:text-sm px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap uppercase tracking-wider">
          🎉 50% OFF OFFER
        </span>
        <span className="text-white font-medium text-xs sm:text-sm">
          Get 50% discount on all theme purchases! Use coupon code <span className="bg-white/20 px-2 py-0.5 rounded font-mono font-bold tracking-widest text-amber-300">PLAZMA50</span>
        </span>
      </div>
    </div>
  );
}

