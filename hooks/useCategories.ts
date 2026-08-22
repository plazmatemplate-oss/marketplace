import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi, getSubcategoriesApi, getCategoryByIdApi } from "@/services/categoryService";

export const CATEGORY_KEYS = {
  all: ["categories"] as const,
  list: () => ["categories", "list"] as const,
  detail: (id: string) => ["categories", "detail", id] as const,
  subcategories: (categoryId?: string) => ["subcategories", categoryId] as const,
};

export function useCategories() {
  return useQuery({
    queryKey: CATEGORY_KEYS.list(),
    queryFn: getCategoriesApi,
    staleTime: 10 * 60 * 1000,
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: CATEGORY_KEYS.detail(id),
    queryFn: () => getCategoryByIdApi(id),
    enabled: !!id,
  });
}

export function useSubcategories(categoryId?: string) {
  return useQuery({
    queryKey: CATEGORY_KEYS.subcategories(categoryId),
    queryFn: () => getSubcategoriesApi(categoryId),
  });
}
