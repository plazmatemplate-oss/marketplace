"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { User, ShoppingBag, Menu, LogOut, Package, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useUserProfile, AUTH_KEYS } from "@/hooks/useAuth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useCategories } from "@/hooks/useCategories";
import { useCart } from "@/hooks/useCart";
import type { CartItem } from "@/types/api";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: userProfile } = useUserProfile();
  const { data: fetchedCategories } = useCategories();
  const { data: cart } = useCart();
  const rawItems: CartItem[] = cart?.cartItems || cart?.items || [];
  const cartCount = rawItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const categoriesList = fetchedCategories && fetchedCategories.length > 0
    ? fetchedCategories.map((c) => ({ name: c.name, slug: c.slug }))
    : [];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isEStoreMobileOpen, setIsEStoreMobileOpen] = useState(false);
  const [currency, setCurrency] = useState({ symbol: '€', code: 'EUR' });
  const [currentUser, setCurrentUser] = useState<{ name?: string; email?: string } | null>(null);

  useEffect(() => {
    const syncUser = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setCurrentUser(JSON.parse(storedUser));
          } catch {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      }
    };

    syncUser();
    window.addEventListener("authChange", syncUser);
    window.addEventListener("storage", syncUser);
    return () => {
      window.removeEventListener("authChange", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, [userProfile, pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    setCurrentUser(null);
    queryClient.invalidateQueries({ queryKey: AUTH_KEYS.profile });
    queryClient.resetQueries({ queryKey: AUTH_KEYS.profile });
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  const loggedInUser = userProfile || currentUser;
  const userName = loggedInUser?.name || "Account";
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "A";

  const currencies = [
    { symbol: '€', code: 'EUR' },
    { symbol: '₹', code: 'INR' },
    { symbol: '$', code: 'USD' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full bg-white z-40 relative">
      <div className="container mx-auto py-5 flex items-center justify-between border-b border-theme-gray-50">

        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger className="p-0 hover:bg-transparent inline-flex items-center justify-center rounded-md">
                <Menu className="h-7 w-7 text-theme-gray-800" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-75 bg-white border-r border-theme-gray-100 overflow-y-auto">
                <nav className="flex flex-col py-6">
                  <Link href="/" className="px-6 py-3 text-[15px] text-theme-gray-800 font-semibold hover:text-primary transition-colors">Home</Link>
                  <Link href="/modules" className="px-6 py-3 text-[15px] text-theme-gray-800 font-semibold hover:text-primary transition-colors">Plazma Modules</Link>
                  <Link href="/megashop" className="px-6 py-3 text-[15px] text-theme-gray-800 font-semibold hover:text-primary transition-colors">MegaShop Themes</Link>

                  <div className="group">
                    <div
                      className={cn(
                        "px-6 py-3 text-[15px] font-semibold flex items-center justify-between transition-colors",
                        isEStoreMobileOpen ? "text-primary" : "text-theme-gray-800"
                      )}
                    >
                      <Link href="/estore" className="flex-1 hover:text-primary">
                        E-Store Themes
                      </Link>
                      <button
                        type="button"
                        className="p-2 -mr-2 cursor-pointer"
                        onClick={() => setIsEStoreMobileOpen(!isEStoreMobileOpen)}
                      >
                        <svg className={cn("w-4 h-4 transition-transform duration-200", isEStoreMobileOpen ? "text-theme-gray-900 rotate-180" : "text-theme-gray-400 rotate-0")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </button>
                    </div>
                    {isEStoreMobileOpen && (
                      <div className="flex flex-col border-b-2 border-primary pb-3 mb-2">
                        {categoriesList.map((category) => {
                          const isActive = pathname === `/${category.slug}` || pathname.startsWith(`/${category.slug}/`);
                          return (
                            <Link
                              key={category.slug}
                              href={`/${category.slug}`}
                              className={cn(
                                "px-6 py-2.5 pl-10 text-[14px] transition-colors flex items-center gap-3",
                                isActive ? "text-primary font-medium" : "text-theme-gray-600 hover:text-primary"
                              )}
                            >
                              <span className={cn(
                                "w-2 h-2 rounded-full shrink-0",
                                isActive ? "bg-primary border-0" : "border-[1.5px] border-theme-gray-500"
                              )}></span>
                              {category.name}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <Link href="/about" className="px-6 py-3 text-[15px] text-theme-gray-800 font-semibold hover:text-primary transition-colors">About Us</Link>
                  <Link href="/contact" className="px-6 py-3 text-[15px] text-theme-gray-800 font-semibold hover:text-primary transition-colors">Contact Us</Link>

                  {/* {loggedInUser ? (
                    <div className="border-t border-theme-gray-100 mt-2 pt-3 px-6">
                      <div className="text-[15px] font-bold text-theme-gray-800 mb-0.5 flex items-center gap-2">
                        <User className="w-4 h-4 text-theme-pink" />
                        {userName}
                      </div>
                      {loggedInUser.email && (
                        <div className="text-[12px] text-theme-gray-500 mb-2 truncate">
                          {loggedInUser.email}
                        </div>
                      )}
                      <Link
                        href="/order-history"
                        className="text-[14px] text-theme-gray-700 font-semibold hover:text-primary transition-colors flex items-center gap-2 mb-3"
                      >
                        Order History
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-[14px] text-red-600 font-semibold hover:underline cursor-pointer flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="border-t border-theme-gray-100 mt-2 pt-2">
                      <Link href="/login" className="px-6 py-3 text-[15px] text-theme-gray-800 font-semibold hover:text-primary transition-colors flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Sign In
                      </Link>
                      <Link href="/registration" className="px-6 py-3 text-[14px] text-theme-gray-600 hover:text-primary transition-colors">Create Account</Link>
                    </div>
                  )} */}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center">
            <Image
              src="/images/main-logo.jpg"
              alt="Plazma Themes Logo"
              width={250}
              height={60}
              className="w-45 md:w-62.5 h-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-6 md:gap-8">

          {loggedInUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex flex-col items-center gap-0.5 group outline-none cursor-pointer">
                <div className="relative">
                  <User className="h-5 w-5 text-theme-pink group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="text-[12px] font-medium text-theme-gray-800 group-hover:text-primary transition-colors hidden md:block max-w-24 truncate">
                    {userName}
                  </span>
                  <ChevronDown className="w-3 h-3 text-theme-gray-400 group-hover:text-primary transition-transform duration-200 hidden md:block" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-64 bg-white/95 backdrop-blur-md shadow-2xl shadow-slate-200/80 border border-slate-100 p-2 rounded-2xl z-50">
                <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-100/80 mb-1.5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm border-2 border-white">
                    {userInitial}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-800 truncate leading-tight">{userName}</p>
                    {loggedInUser.email && (
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{loggedInUser.email}</p>
                    )}
                  </div>
                </div>

                <DropdownMenuItem className="p-0 hover:bg-transparent focus:bg-transparent">
                  <Link
                    href="/order-history"
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100/80 focus:bg-slate-100/80 transition-colors w-full cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-pink-50 text-pink-600 group-hover:bg-pink-100 transition-colors">
                        <Package className="w-4 h-4" />
                      </div>
                      <span>Order History</span>
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-1.5 bg-slate-100" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm font-medium text-rose-600 hover:bg-rose-50 focus:bg-rose-50 focus:text-rose-600 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600 group-hover:bg-rose-100 transition-colors">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span>Logout</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="flex flex-col items-center gap-1 hover:text-primary group">
              <User className="h-5 w-5 text-theme-gray-600 group-hover:text-theme-gray-900 transition-colors" />
              <span className="text-[12px] font-medium text-theme-gray-600 group-hover:text-primary transition-colors hidden md:block">Sign In</span>
            </Link>
          )}

          {/* <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-col items-center gap-1 hover:text-primary outline-none">
              <span className="h-5 w-5 flex items-center justify-center font-bold text-theme-gray-600 group-hover:text-primary transition-colors">{currency.symbol}</span>
              <span className="text-[12px] font-medium text-theme-gray-600 group-hover:text-primary transition-colors hidden md:block">{currency.code}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currencies.map((c) => (
                <DropdownMenuItem
                  key={c.code}
                  className="cursor-pointer"
                  onClick={() => setCurrency(c)}
                >
                  {c.symbol} {c.code}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          <Link href="/cart" className="flex flex-col items-center gap-1 hover:text-primary group outline-none">
            <div className="relative">
              <ShoppingBag className="h-5 w-5 text-theme-gray-600 group-hover:text-theme-gray-900 transition-colors" />
              <span className="absolute -top-2.5 -right-2.5 bg-theme-blue text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">{cartCount}</span>
            </div>
            <span className="text-[12px] font-medium text-theme-gray-600 group-hover:text-primary transition-colors hidden md:block">Cart</span>
          </Link>

        </div>
      </div>

      <div className="hidden lg:block h-13.25">
        <div className={cn(
          "w-full transition-all duration-300",
          isScrolled
            ? "fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50 animate-in slide-in-from-top-2"
            : "relative bg-white/80 backdrop-blur-sm shadow-sm z-40"
        )}>
          <nav className="container mx-auto flex items-center justify-center gap-8 py-3.5">
            <Link href="/" className="text-[13px] font-medium text-theme-gray-600 hover:text-theme-gray-900 tracking-wide">Home</Link>
            <Link href="/modules" className="text-[13px] font-medium text-theme-gray-600 hover:text-theme-gray-900 tracking-wide transition-colors">Plazma Modules</Link>
            <Link href="/megashop" className="text-[13px] font-medium text-theme-gray-600 hover:text-theme-gray-900 tracking-wide transition-colors">MegaShop Themes</Link>

            <div className="group relative py-3.5">
              <Link
                href="/estore"
                className="text-[13px] font-medium text-theme-gray-600 group-hover:text-primary tracking-wide transition-colors outline-none flex items-center gap-1"
              >
                E-Store Themes <svg className="w-3 h-3 text-theme-gray-400 group-hover:text-theme-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </Link>

              <div className="absolute top-full left-0 w-125 bg-white shadow-xl border-b-2 border-b-primary rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-6 pt-5">

                <div className="relative grid grid-cols-2 gap-x-12 gap-y-3.5">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-theme-gray-100 -translate-x-1/2"></div>

                  {categoriesList.map((category) => {
                    const isActive = pathname === `/${category.slug}` || pathname.startsWith(`/${category.slug}/`);
                    return (
                      <Link
                        key={category.slug}
                        href={`/${category.slug}`}
                        className={cn(
                          "text-[13.5px] transition-colors flex items-center gap-2.5",
                          isActive ? "text-primary font-medium" : "text-theme-gray-600 hover:text-primary"
                        )}
                      >
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          isActive ? "bg-primary border-0" : "border border-theme-gray-500"
                        )}></span>
                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link href="/about" className="text-[13px] font-medium text-theme-gray-600 hover:text-theme-gray-900 tracking-wide transition-colors">About Us</Link>
            <Link href="/contact" className="text-[13px] font-medium text-theme-gray-600 hover:text-theme-gray-900 tracking-wide transition-colors">Contact Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
