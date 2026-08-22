import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  preTitle?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
  uppercase?: boolean;
}

export default function SectionTitle({ 
  title, 
  preTitle,
  subtitle,
  align = "center",
  className = "",
  as = "h2",
  uppercase = true
}: Readonly<SectionTitleProps>) {
  const Component = as;
  return (
    <div className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {preTitle && (
        <span className="text-[12px] md:text-[13px] font-bold text-theme-gray-500 tracking-wider uppercase mb-2">
          {preTitle}
        </span>
      )}
      
      <div className="relative inline-block">
        <Component className={cn(
          "h2 text-theme-gray-800",
          uppercase && "uppercase"
        )}>
          {title}
        </Component>
        <div className={cn(
          "absolute -bottom-3 flex items-center gap-1",
          align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
        )}>
           <div className="w-8 h-0.5 bg-theme-purple"></div>
           <div className="w-1 h-0.5 bg-theme-purple"></div>
           <div className="w-1 h-0.5 bg-theme-purple"></div>
        </div>
      </div>

      {subtitle && (
        <p className="text-theme-gray-500 text-[15px] leading-relaxed mt-7 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
