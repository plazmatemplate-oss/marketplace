import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsApi, getProductByIdApi, getProductBySlugApi, getProductReviewsApi, createProductReviewApi } from "@/services/productService";
import type { ProductQueryParams, CreateReviewPayload } from "@/types/api";

export const PRODUCT_KEYS = {
  all: ["products"] as const,
  list: (params?: ProductQueryParams) => ["products", "list", params] as const,
  detail: (id: string) => ["products", "detail", id] as const,
  slug: (slug: string) => ["products", "slug", slug] as const,
  reviews: (productId: string) => ["products", "reviews", productId] as const,
};

export function useProducts(params?: ProductQueryParams) {
  return useQuery({
    queryKey: PRODUCT_KEYS.list(params),
    queryFn: () => getProductsApi(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useInfiniteProducts(params?: ProductQueryParams, pageSize: number = 12) {
  return useInfiniteQuery({
    queryKey: [...PRODUCT_KEYS.list(params), "infinite", pageSize],
    queryFn: ({ pageParam = 1 }) =>
      getProductsApi({
        ...params,
        pageNumber: pageParam as number,
        pageSize,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !Array.isArray(lastPage) || lastPage.length === 0 || lastPage.length < pageSize) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: PRODUCT_KEYS.detail(id),
    queryFn: () => getProductByIdApi(id),
    enabled: !!id,
  });
}

export function useProductBySlug(slug: string) {
  return useQuery({
    queryKey: PRODUCT_KEYS.slug(slug),
    queryFn: () => getProductBySlugApi(slug),
    enabled: !!slug,
  });
}

export function useProductReviews(productId: string) {
  return useQuery({
    queryKey: PRODUCT_KEYS.reviews(productId),
    queryFn: () => getProductReviewsApi(productId),
    enabled: !!productId,
  });
}

export function useCreateReviewMutation(productId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => createProductReviewApi(productId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.reviews(productId) });
      queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.all });
    },
  });
}
