import { apiFetch } from "@/lib/api";
import type { ContactPayload } from "@/types/api";

export const submitContactApi = async (payload: ContactPayload): Promise<{ success: boolean; message: string }> => {
  return apiFetch("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const subscribeNewsletterApi = async (email: string): Promise<{ success: boolean; message: string }> => {
  return apiFetch("/subscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};
