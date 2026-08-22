import { apiFetch } from "@/lib/api";

export interface UploadResponse {
  message: string;
  url: string;
}

export const uploadImageApi = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  return apiFetch<UploadResponse>("/upload/image", {
    method: "POST",
    body: formData,
  });
};

export const uploadFileApi = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch<UploadResponse>("/upload/file", {
    method: "POST",
    body: formData,
  });
};

export const deleteUploadApi = async (url: string): Promise<{ message: string }> => {
  return apiFetch<{ message: string }>("/upload", {
    method: "DELETE",
    body: JSON.stringify({ url }),
  });
};
