import React from "react";

export default function TopBanner() {
  return (
    <div className="w-full bg-(image:--theme-background-gradiant) py-2 px-4 text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 max-w-7xl mx-auto">
        <span className="bg-white text-theme-gray-900 font-bold text-xs sm:text-sm px-3 py-1 rounded-sm shadow-sm whitespace-nowrap">
          Trending Themes
        </span>
        <span className="text-white font-medium text-xs sm:text-sm">
          The No.1 Prestashop Theme Everyone Is Buying. Hurry and Get It Now!
        </span>
      </div>
    </div>
  );
}
