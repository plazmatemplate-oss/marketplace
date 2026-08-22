import { apiFetch } from "@/lib/api";
import type { Category, Subcategory } from "@/types/api";

export const getCategoriesApi = async (): Promise<Category[]> => {
  return apiFetch<Category[]>("/categories");
};

export const getCategoryByIdApi = async (id: string): Promise<Category> => {
  return apiFetch<Category>(`/categories/${id}`);
};

export const getSubcategoriesApi = async (categoryId?: string): Promise<Subcategory[]> => {
  const url = categoryId ? `/subcategories?categoryId=${categoryId}` : "/subcategories";
  return apiFetch<Subcategory[]>(url);
};
