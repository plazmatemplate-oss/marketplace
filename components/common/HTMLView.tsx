"use client";

import { cn } from "@/lib/utils";

export function HTMLViewer({ content, className }: { content: string, className?: string }) {
  if (!content) return null;

  return (
    <div
      className={cn(
        "html-viewer-container",
        "max-w-none w-full",
        "md:text-lg text-sm text-foreground",
        "[&_p]:mb-4",
        "[&_h1]:text-3xl [&_h1]:md:text-5xl [&_h1]:font-semibold [&_h1]:mb-6 [&_h1]:mt-12 [&_h1]:md:mb-10 [&_h1]:md:mt-16",
        "[&_h2]:md:text-2xl [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:md:mb-4 [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:md:mt-8",
        "[&_h3]:md:text-xl [&_h3]:text-base [&_h3]:font-semibold [&_h3]:md:mb-3 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:md:mt-6",
        "[&_h4]:md:text-lg [&_h4]:text-base [&_h4]:font-semibold [&_h4]:md:mb-2 [&_h4]:mb-2 [&_h4]:mt-4 [&_h4]:md:mt-4",
        "[&_ul]:list-disc [&_ul]:pl-8 [&_ul]:md:mb-8 [&_ul]:mb-4 [&_ul]:md:space-y-3 [&_ul]:space-y-2",
        "[&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:md:mb-8 [&_ol]:mb-4 [&_ol]:md:space-y-3 [&_ol]:space-y-2",
        "[&_li]:pl-2",
        "[&_blockquote]:relative [&_blockquote]:my-6 [&_blockquote]:md:p-6 [&_blockquote]:p-4",
        "[&_blockquote]:border-l-[6px] [&_blockquote]:border-primary",
        "[&_blockquote]:bg-muted [&_blockquote]:rounded-r-sm",
        "[&_blockquote_p]:sm:text-xl [&_blockquote_p]:font-medium [&_blockquote_p]:italic [&_blockquote_p]:text-foreground [&_blockquote_p]:mb-0",
        "[&_blockquote_cite]:block [&_blockquote_cite]:mt-4 [&_blockquote_cite]:text-sm [&_blockquote_cite]:not-italic [&_blockquote_cite]:text-muted-foreground",
        "[&_a]:text-primary [&_a_strong]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-2 [&_a]:font-medium hover:[&_a]:text-primary/80 transition-all",
        "[&_strong]:font-bold [&_strong]:text-foreground",
        "[&_b]:font-bold [&_b]:text-foreground",
        "[&_em]:italic",
        "[&_table]:block [&_table]:overflow-x-auto [&_table]:w-full [&_table]:md:my-10 [&_table]:my-6 [&_table]:border-collapse [&_table]:rounded-sm [&_table]:border [&_table]:border-border",
        "sm:[&_table]:table sm:[&_table]:overflow-visible",
        "[&_thead]:bg-border/50",
        "[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-bold [&_th]:border-b [&_th]:border-r [&_th]:border-border [&_th:last-child]:border-r-0 [&_th]:text-sm [&_th]:uppercase",
        "[&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-r [&_td]:border-border [&_td:last-child]:border-r-0 [&_tr:last-child_td]:border-b-0 [&_td]:text-base",
        "[&_tr:nth-child(even)]:bg-muted/10",
        "[&_img]:rounded-sm [&_img]:md:my-12 [&_img]:my-6 [&_img]:mx-auto [&_img]:max-w-full",
        "[&_figure]:md:my-12 [&_figure]:my-6",
        "[&_figcaption]:mt-4 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground",
        "[&_video]:rounded-sm [&_video]:md:my-12 [&_video]:my-6 [&_video]:w-full",
        "[&_pre_code]:whitespace-pre-wrap",
        "[&_hr]:md:my-8 [&_hr]:my-6 [&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-linear-to-r [&_hr]:from-transparent [&_hr]:via-border [&_hr]:to-transparent",
        "[&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:bg-muted [&_code]:text-primary [&_code]:font-mono [&_code]:text-[0.9em]",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
