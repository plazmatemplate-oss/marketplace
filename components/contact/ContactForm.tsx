"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Paperclip, X, Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSubmitContact } from "@/hooks/useContact";
import { useUploadFile, useDeleteUpload } from "@/hooks/useUpload";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  subject: z.string().min(1, "Please select a subject"),
  email: z.string().min(1, 'Email is required').pipe(z.email('Invalid email format')),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [attachmentFileName, setAttachmentFileName] = useState<string | null>(null);

  const submitContactMutation = useSubmitContact();
  const uploadFileMutation = useUploadFile();
  const deleteUploadMutation = useDeleteUpload();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "Customer service",
      email: "",
      message: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAttachmentFileName(file.name);
    uploadFileMutation.mutate(file, {
      onSuccess: (res) => {
        setAttachmentUrl(res.url);
      },
      onError: () => {
        setAttachmentUrl(null);
        setAttachmentFileName(null);
      },
    });
  };

  const handleClearAttachment = () => {
    if (attachmentUrl) {
      deleteUploadMutation.mutate(attachmentUrl);
    }
    setAttachmentUrl(null);
    setAttachmentFileName(null);
  };

  const onSubmit = (data: ContactFormValues) => {
    submitContactMutation.mutate(
      {
        subject: data.subject,
        email: data.email,
        message: data.message,
        attachment: attachmentUrl || undefined,
      },
      {
        onSuccess: (res) => {
          const msg = res.message || "Your message has been sent successfully!";
          toast.success(msg);
          reset();
          setAttachmentUrl(null);
          setAttachmentFileName(null);
        },
        onError: (err) => {
          const errMsg = err.message || "Failed to send message. Please try again.";
          toast.error(errMsg);
        },
      }
    );
  };

  const isAttachmentUploaded = !!attachmentFileName || uploadFileMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">Subject</Label>
        <div className="flex-1 flex flex-col gap-1.5">
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-theme-dark-blue transition-colors shadow-none outline-none">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} className="bg-white border border-theme-gray-200 shadow-md rounded-sm z-50 overflow-hidden">
                  <SelectItem value="Customer service" className="text-[14px] text-theme-gray-600 focus:bg-theme-dark-blue focus:text-white cursor-pointer rounded-sm">
                    Customer service
                  </SelectItem>
                  <SelectItem value="Webmaster" className="text-[14px] text-theme-gray-600 focus:bg-theme-dark-blue focus:text-white cursor-pointer rounded-sm">
                    Webmaster
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.subject && <p className="text-theme-error text-xs">{errors.subject.message}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">Email address</Label>
        <div className="flex-1 flex flex-col gap-1.5">
          <Input type="text" {...register("email")} placeholder="your@email.com" className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 h-10.5 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none" />
          {errors.email && <p className="text-theme-error text-xs">{errors.email.message}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-2.5">Attachment</Label>
        <div className="flex-1 flex items-center gap-4">
          <div className="flex-1 flex relative items-center">
            <div className="flex-1 border border-theme-gray-200 rounded-l-sm bg-theme-gray-50/50 h-10.5 px-4 flex items-center gap-2 overflow-hidden text-[13px] text-theme-gray-600">
              {uploadFileMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-theme-dark-blue shrink-0" />
                  <span className="truncate italic">Uploading {attachmentFileName}...</span>
                </>
              ) : attachmentFileName ? (
                <>
                  <Paperclip className="w-4 h-4 text-theme-dark-blue shrink-0" />
                  <span className="truncate font-medium">{attachmentFileName}</span>
                  <button
                    type="button"
                    onClick={handleClearAttachment}
                    disabled={deleteUploadMutation.isPending}
                    title="Cancel and remove attachment"
                    className="p-1 hover:text-red-600 text-theme-gray-400 transition-colors"
                  >
                    {deleteUploadMutation.isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </button>
                </>
              ) : (
                <span className="text-theme-gray-400">No file selected</span>
              )}
            </div>

            <Label 
              className={cn(
                "bg-theme-gray-200 hover:bg-theme-gray-300 transition-colors text-theme-gray-700 px-6 h-10.5 flex items-center cursor-pointer rounded-r-sm font-medium text-[14px] shrink-0",
                isAttachmentUploaded && "opacity-50 pointer-events-none cursor-not-allowed"
              )}
            >
              {"Choose File"}
              <input
                type="file"
                className="hidden"
                disabled={isAttachmentUploaded}
                onChange={handleFileChange}
                accept=".pdf,.epub,.zip,.rar,.txt,.doc,.docx"
              />
            </Label>
          </div>
          <span className="text-[13px] text-theme-gray-500 italic whitespace-nowrap">optional</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
        <Label className="text-[14px] text-theme-gray-700 font-medium sm:w-1/4 sm:text-right pt-3">Message</Label>
        <div className="flex-1 flex flex-col gap-1.5">
          <Textarea {...register("message")} placeholder="Enter your message" rows={6} className="w-full bg-white border border-theme-gray-200 rounded-sm px-4 py-3 text-[14px] text-theme-gray-600 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-theme-dark-blue transition-colors shadow-none resize-none" />
          {errors.message && <p className="text-theme-error text-xs">{errors.message.message}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-2">
        <div className="sm:w-1/4"></div>
        <div className="flex-1 flex justify-end">
          <Button 
            type="submit" 
            disabled={submitContactMutation.isPending || uploadFileMutation.isPending || deleteUploadMutation.isPending}
            className="w-full sm:w-auto px-8 self-end shadow-md flex items-center gap-2"
          >
            {submitContactMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitContactMutation.isPending ? "SENDING..." : "SEND"}
          </Button>
        </div>
      </div>
    </form>
  );
}
