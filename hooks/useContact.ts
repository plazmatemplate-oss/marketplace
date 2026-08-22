import { useMutation } from "@tanstack/react-query";
import { submitContactApi, subscribeNewsletterApi } from "@/services/contactService";
import type { ContactPayload } from "@/types/api";

export function useSubmitContact() {
  return useMutation<{ success: boolean; message: string }, Error, ContactPayload>({
    mutationFn: submitContactApi,
  });
}

export function useSubscribeNewsletter() {
  return useMutation<{ success: boolean; message: string }, Error, string>({
    mutationFn: subscribeNewsletterApi,
  });
}
