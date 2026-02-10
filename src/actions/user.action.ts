"use server";

import { ProfileUpdatePayload, userService } from "@/services/user.service";

export async function getUserSession() {
  return await userService.getSession();
}

export async function updateUserProfile(payload: ProfileUpdatePayload) {
  return await userService.updateProfile(payload);
}
