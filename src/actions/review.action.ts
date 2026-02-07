"use server";

import { Review, reviewService } from "@/services/review.service";

export async function createReview(payload: Review) {
  return await reviewService.createReview(payload);
}
