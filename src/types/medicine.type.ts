import { Category } from "./category.type";
import { OrderItem } from "./order.type";
import { Review } from "./review.type";
import { User } from "./user.type";

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  dosage: string;
  expiryDate: string;
  categoryId: string;
  category?: Category;
  sellerId: string;
  seller?: User;
  orderItems?: OrderItem[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: { message: string } | null;
}
