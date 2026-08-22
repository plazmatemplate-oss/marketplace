"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { categories as fallbackCategories } from "@/lib/categories";
import { useCategories, useSubcategories } from "@/hooks/useCategories";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CategorySidebar() {
  const pathname = usePathname();
  const { data: fetchedCategories } = useCategories();
  const { data: fetchedSubcategories } = useSubcategories();

  const categoriesList = (fetchedCategories && fetchedCategories.length > 0)
    ? fetchedCategories.map((cat) => {
        const subs = fetchedSubcategories
          ? fetchedSubcategories.filter(
              (sub) => sub.categoryId === cat._id || (typeof sub.categoryId === "object" && (sub.categoryId as any)._id === cat._id)
            )
          : [];
        return {
          id: cat._id,
          name: cat.name,
          slug: cat.slug,
          subCategories: subs.map((s) => ({ name: s.name, slug: s.slug })),
        };
      })
    : fallbackCategories;

  return (
    <Card className="flex flex-col overflow-hidden w-full p-0 gap-0">
      <CardHeader className="bg-theme-light-blue px-5 py-4 border-b border-theme-gray-100">
        <CardTitle className="text-[16px] text-theme-gray-900 font-semibold">Home</CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        <Accordion className="w-full flex flex-col">
        {categoriesList.map((category, idx) => {
          const isActive = pathname === `/${category.slug}` || pathname.startsWith(`/${category.slug}/`);
          const hasSub = category.subCategories && category.subCategories.length > 0;
          
          if (!hasSub) {
            return (
              <div key={category.slug} className={cn(
                "px-5 py-3.5 text-[13.5px] transition-colors flex items-center group",
                isActive ? "text-primary font-medium" : "text-theme-gray-600 hover:text-theme-gray-900",
                idx !== categoriesList.length - 1 ? 'border-b border-theme-gray-100' : ''
              )}>
                <Link href={`/${category.slug}`} className="flex items-center gap-2.5 flex-1">
                  <span className={cn("w-1 h-1 rounded-full", isActive ? "bg-primary" : "bg-theme-gray-400")}></span>
                  {category.name}
                </Link>
              </div>
            );
          }
          
          return (
            <AccordionItem 
              key={category.slug} 
              value={category.slug} 
              className="border-b border-theme-gray-100 last:border-0"
            >
              <div className="px-5 py-1.5 flex items-center justify-between">
                <Link 
                  href={`/${category.slug}`} 
                  className={cn(
                    "flex items-center gap-2.5 flex-1 text-[13.5px] transition-colors py-2",
                    isActive ? "text-primary font-medium" : "text-theme-gray-600 hover:text-theme-gray-900"
                  )}
                >
                  <span className={cn("w-1 h-1 rounded-full", isActive ? "bg-primary" : "bg-theme-gray-400")}></span>
                  {category.name}
                </Link>
                
                <AccordionTrigger className="py-2 px-1 hover:no-underline [&>svg]:w-3.5 [&>svg]:h-3.5 text-theme-gray-400 hover:text-theme-gray-900 flex-none w-fit" aria-label={`Toggle ${category.name} subcategories`}>
                  <span className="sr-only">Toggle {category.name}</span>
                </AccordionTrigger>
              </div>
              
              <AccordionContent className="pb-0">
                <div className="pl-5.5 pr-5 pb-3 flex flex-col relative">
                  {category.subCategories.map((sub, subIdx) => {
                    const isSubActive = pathname === `/${sub.slug}`;
                    const isLast = subIdx === category.subCategories.length - 1;
                    return (
                      <div key={sub.slug} className="relative flex items-center mt-3 pl-4.5">
                        <div className={cn(
                            "absolute left-0 w-px bg-theme-gray-200",
                            isLast ? "-top-3 h-[calc(50%+12px)]" : "-top-3 h-[calc(100%+12px)]"
                        )}></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-px bg-theme-gray-200"></div>
                        <Link 
                          href={`/${sub.slug}`}
                          className={cn(
                            "text-[13px] transition-colors",
                            isSubActive ? "text-primary font-medium" : "text-theme-gray-500 hover:text-primary"
                          )}
                        >
                          {sub.name}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
