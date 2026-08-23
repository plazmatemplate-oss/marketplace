"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Rss } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FOOTER_LINKS = [
  {
    title: "Information",
    className: "lg:border-r border-theme-gray-100 lg:pr-8 lg:pl-4",
    links: [
      { label: "Legal Notice", href: "/legal-notice" },
      { label: "Terms & Conditions", href: "/termsandconditions" },
      { label: "Secure Payment", href: "/secure-payment" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ]
  },
  {
    title: "Useful Links",
    className: "lg:border-r border-theme-gray-100 lg:pr-8 lg:pl-4",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Best Sales", href: "/best-sales" },
    ]
  },
  {
    title: "Essential Links",
    className: "lg:border-r border-theme-gray-100 lg:pr-8 lg:pl-4",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Sign In", href: "/login" },
      { label: "Create Account", href: "/registration" },
      { label: "Forgot Password", href: "/password-recovery" },
    ]
  },
  {
    title: "Manage Profile",
    className: "lg:pl-4 border-b-0",
    links: [
      { label: "Orders", href: "/order-history" },
    ]
  }
];

function LogoBlock({ isMobile = false }: Readonly<{ isMobile?: boolean }>) {
  return (
    <div className={`flex flex-col space-y-3 pb-2 md:pb-0 ${isMobile ? "items-center text-center w-full" : "lg:border-r border-theme-gray-100 lg:pr-8"}`}>
      <Link href="/" className="mb-2 w-full flex justify-center md:justify-start">
        {isMobile ? (
          <Image src="/images/main-logo.jpg" alt="Plazma Themes Logo" width={180} height={43} className="w-45 h-auto object-contain" />
        ) : (
          <Image src="/images/main-logo.jpg" alt="Plazma Themes Logo" width={250} height={60} className="w-62.5 h-auto object-contain" />
        )}
      </Link>
      <p className={`text-[13px] text-theme-gray-600 leading-relaxed max-w-60 ${isMobile ? "mx-auto" : ""}`}>
        Your idea blended with the latest technology
      </p>
      <div className={`flex items-center gap-3 text-[13px] text-theme-gray-600 ${isMobile ? "justify-center" : ""}`}>
        <Mail className="h-4 w-4 text-theme-gray-800 shrink-0" />
        <span>plazmatemplate@gmail.com</span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-theme-purple/10 pt-12 pb-6 mt-0 w-full font-sans">
      <div className="container mx-auto">

        <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 pb-8 border-b border-theme-gray-100 mb-6 md:mb-10">
          <span className="text-[13px] font-bold text-theme-gray-800 tracking-wide uppercase whitespace-nowrap hidden md:block">FOLLOW US:</span>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="https://facebook.com/plazmathemes" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-theme-gray-700 hover:bg-social-facebook hover:text-white transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </Link>
            <Link href="https://twitter.com/plazmathemes" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-theme-gray-700 hover:bg-social-twitter hover:text-white transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </Link>
            <Link href="https://pinterest.com/plazmathemes" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-theme-gray-700 hover:bg-social-pinterest hover:text-white transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.163 0 7.398 2.967 7.398 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.622.002 12.017 0z" />
              </svg>
            </Link>
            <Link href="https://vimeo.com/plazmathemes" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-theme-gray-700 hover:bg-social-vimeo hover:text-white transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
              <Rss className="w-3.5 h-3.5" />
            </Link>
            <Link href="https://linkedin.com/company/plazmathemes" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-theme-gray-700 hover:bg-social-linkedin hover:text-white transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </Link>
            <Link href="https://youtube.com/plazmathemes" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-theme-gray-700 hover:bg-theme-error hover:text-white transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-x-0 md:gap-x-8 gap-y-0 md:gap-y-8">
          <LogoBlock />
          {FOOTER_LINKS.map((section, idx) => (
            <div key={idx} className={`flex flex-col space-y-3 ${section.className || ''}`}>
              <h3 className="text-[13px] font-bold text-theme-gray-800 uppercase tracking-wide mb-2">{section.title}</h3>
              <div className="flex flex-col space-y-3">
                {section.links.map((link, lIdx) => (
                  <Link key={lIdx} href={link.href} className="text-[13px] text-theme-gray-600 hover:text-theme-pink transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden flex flex-col gap-6">
          <LogoBlock isMobile={true} />
          <div className="border border-theme-gray-200 rounded-xl overflow-hidden">
            <Accordion className="w-full">
              {FOOTER_LINKS.map((section, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-theme-gray-200 px-5 last:border-0">
                  <AccordionTrigger className="text-[13px] font-bold text-theme-gray-800 uppercase tracking-wide py-4 hover:no-underline">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-3 pb-4">
                      {section.links.map((link, lIdx) => (
                        <Link key={lIdx} href={link.href} className="text-[13px] text-theme-gray-600 hover:text-theme-pink transition-colors">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 border-t border-theme-gray-100 text-center">
          <p className="text-[12px] text-theme-gray-600 font-medium">2026 © - All Copyright Reserved By plazmathemes</p>
        </div>

      </div>
    </footer>
  );
}
