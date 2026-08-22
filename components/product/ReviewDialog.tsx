"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Star, X, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useUserProfile } from "@/hooks/useAuth";
import { useCreateReviewMutation } from "@/hooks/useProducts";
import { getImageUrl } from "@/lib/utils";
import { toast } from "@/lib/toast";

const reviewSchema = z.object({
  quality: z.number().min(1, "Please select a rating"),
  title: z.string().min(1, "Title is required"),
  review: z.string().min(1, "Review is required"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface ReviewDialogProps {
  productId?: string;
  productTitle?: string;
  productImage?: string;
  customTrigger?: React.ReactNode;
}

export default function ReviewDialog({
  productId = "",
  productTitle = "Product Review",
  productImage,
  customTrigger,
}: Readonly<ReviewDialogProps>) {
  const [open, setOpen] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const { data: userProfile } = useUserProfile();
  const createReviewMutation = useCreateReviewMutation(productId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      quality: 0,
      title: "",
      review: "",
    },
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        toast.error("Please login to write a review");
        return;
      }
    }
    setOpen(newOpen);
  };

  const onSubmit = async (data: ReviewFormValues) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Please login to write a review");
      setOpen(false);
      return;
    }

    if (!productId) {
      toast.error("Product ID is missing.");
      return;
    }

    let userName = userProfile?.name || "";
    if (!userName && typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          userName = parsed.name || parsed.user?.name || "";
        }
      } catch {
        // ignore parse error
      }
    }

    try {
      await createReviewMutation.mutateAsync({
        title: data.title,
        name: userName || "Anonymous",
        rating: data.quality,
        comment: data.review,
      });
      toast.success("Review submitted successfully!");
      setOpen(false);
      reset();
    } catch (error: any) {
      toast.error(error?.message || "Failed to submit review. Please try again.");
    }
  };

  const displayImage = getImageUrl(
    productImage);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="group">
        {customTrigger ? (
          <div>{customTrigger}</div>
        ) : (
          <span className="text-[13px] text-theme-gray-600 hover:text-theme-gray-900 hover:underline flex items-center gap-2 cursor-pointer">
            <Pencil className="w-3.5 h-3.5" /> <span>Write your review</span>
          </span>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-212.5 w-[95vw] p-0 overflow-visible gap-0 bg-white border-0 *:data-[slot=dialog-close]:hidden shadow-2xl rounded-lg my-auto">
        <button 
          type="button"
          onClick={() => setOpen(false)}
          className="absolute -top-3 -right-3 w-7 h-7 bg-theme-gray-500 hover:bg-theme-gray-600 rounded-full flex items-center justify-center text-white shadow-md z-50 transition-colors focus:outline-none cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col max-h-[85vh]">
          <DialogHeader className="bg-theme-dark-blue p-4 text-white m-0 rounded-t-lg shrink-0">
            <DialogTitle className="text-[18px] font-bold text-white">Write Your Review</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_2fr] p-6 gap-8 bg-white rounded-b-lg overflow-y-auto">
            <div className="hidden md:flex items-start justify-center pt-4">
              <Image 
                src={displayImage} 
                alt={productTitle} 
                width={400}
                height={400}
                unoptimized
                className="w-full max-h-100 object-contain rounded-md"
              />
            </div>

            <div>
              <h3 className="text-[16px] font-bold text-theme-gray-900 mb-4 leading-tight">
                {productTitle}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-theme-gray-700">Quality:</span>
                  <Controller
                    name="quality"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const isFilled = (hoveredStar !== null ? star <= hoveredStar : star <= field.value);
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => field.onChange(star)}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(null)}
                              className="focus:outline-none transition-colors cursor-pointer"
                            >
                              <Star 
                                className={`w-6 h-6 transition-all ${
                                  isFilled 
                                    ? "fill-theme-yellow text-theme-yellow" 
                                    : "text-theme-gray-300 hover:text-theme-gray-400"
                                }`} 
                              />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                </div>
                {errors.quality && <p className="text-theme-error text-xs -mt-2.5">{errors.quality.message}</p>}

                <div className="flex flex-col gap-1.5">
                  <Label className="text-[14px] text-theme-gray-700">Title<span className="text-theme-gray-500">*</span></Label>
                  <Input {...register("title")} className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none" />
                  {errors.title && <p className="text-theme-error text-xs">{errors.title.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-[14px] text-theme-gray-700">Review<span className="text-theme-gray-500">*</span></Label>
                  <Textarea {...register("review")} className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 py-3 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none min-h-25 resize-none" />
                  {errors.review && <p className="text-theme-error text-xs">{errors.review.message}</p>}
                </div>

                <div className="flex flex-col sm:flex-row justify-end items-start sm:items-end mt-2 gap-4">
                  <div className="flex gap-4 w-full sm:w-auto">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setOpen(false)}
                      className="flex-1 sm:flex-none shadow-sm cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createReviewMutation.isPending}
                      className="flex-1 sm:flex-none shadow-sm cursor-pointer"
                    >
                      {createReviewMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
