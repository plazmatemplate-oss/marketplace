"use client";

import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
 return (
 <InputPrimitive
 type={type}
 data-slot="input"
 className={cn(
 "h-10.5 w-full min-w-0 rounded-sm border border-theme-gray-200 bg-white px-3 py-1 text-[14px] text-theme-gray-600 transition-[color,box-shadow] duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-theme-dark-blue focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm :border-destructive/50 :ring-destructive/40",
 className
 )}
 {...props}
 />
 )
}

export { Input }
