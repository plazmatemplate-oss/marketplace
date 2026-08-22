import { useMutation } from "@tanstack/react-query";
import { uploadImageApi, uploadFileApi, deleteUploadApi, type UploadResponse } from "@/services/uploadService";
import { toast } from "@/components/ui/sonner";

export function useUploadImage() {
  return useMutation<UploadResponse, Error, File>({
    mutationFn: (file: File) => uploadImageApi(file),
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload image.");
    },
  });
}

export function useUploadFile() {
  return useMutation<UploadResponse, Error, File>({
    mutationFn: (file: File) => uploadFileApi(file),
    onSuccess: () => {
      toast.success("Document uploaded successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload file.");
    },
  });
}

export function useDeleteUpload() {
  return useMutation<{ message: string }, Error, string>({
    mutationFn: (url: string) => deleteUploadApi(url),
    onSuccess: () => {
      toast.success("File deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete file.");
    },
  });
}
