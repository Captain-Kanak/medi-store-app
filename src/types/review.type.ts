import { Medicine } from "./medicine.type";
import { User } from "./user.type";

export interface Review {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  customer?: User;
  medicineId: string;
  medicine?: Medicine;
  createdAt: string;
  updatedAt: string;
}
