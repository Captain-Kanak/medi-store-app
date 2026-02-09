"use server";

import { categoryService } from "@/services/category.service";

export async function getCategories() {
  return await categoryService.getCategories();
}

export async function addCategory(name: string, description?: string) {
  return await categoryService.addCategory(name, description);
}

export async function updateCategory(
  id: string,
  name: string,
  description?: string,
) {
  return await categoryService.updateCategoryById(id, name, description);
}

export async function deleteCategory(id: string) {
  return await categoryService.deleteCategory(id);
}
