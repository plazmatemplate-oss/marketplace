import { apiFetch } from "@/lib/api";
import type { Product, ProductQueryParams, ProductReviewsResponse, CreateReviewPayload } from "@/types/api";

export const getProductsApi = async (params?: ProductQueryParams): Promise<Product[]> => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);
  if (params?.category) queryParams.append("category", params.category);
  if (params?.subcategory) queryParams.append("subcategory", params.subcategory);
  if (params?.pageNumber) queryParams.append("pageNumber", String(params.pageNumber));
  if (params?.pageSize) queryParams.append("pageSize", String(params.pageSize));

  const queryStr = queryParams.toString();
  const endpoint = `/products${queryStr ? `?${queryStr}` : ""}`;
  return apiFetch<Product[]>(endpoint);
};

export const getProductByIdApi = async (id: string): Promise<Product> => {
  return apiFetch<Product>(`/products/${id}`);
};

export const getProductBySlugApi = async (slug: string): Promise<Product> => {
  return apiFetch<Product>(`/products/${slug}`);
};

export const getProductReviewsApi = async (productId: string): Promise<ProductReviewsResponse> => {
  return apiFetch<ProductReviewsResponse>(`/products/${productId}/reviews`);
};

export const createProductReviewApi = async (
  productId: string,
  payload: CreateReviewPayload
): Promise<ProductReviewsResponse> => {
  return apiFetch<ProductReviewsResponse>(`/products/${productId}/reviews`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
