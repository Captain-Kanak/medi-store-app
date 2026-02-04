"use server";

import { categoryService } from "@/services/category.service";

export async function getCategories() {
  return await categoryService.getCategories();
}
