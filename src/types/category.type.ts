import { Medicine } from "./medicine.type";

export interface Category {
  id: string;
  name: string;
  description?: string;
  medicines?: Medicine[];
  createdAt: string;
  updatedAt: string;
}
