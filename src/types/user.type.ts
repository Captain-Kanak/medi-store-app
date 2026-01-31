import { Medicine } from "./medicine.type";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: UserRoles;
  phone?: string;
  address?: string;
  isBlocked: boolean;
  medicines?: Medicine[];
  orders?: any[];
  reviews?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface UserType {
  name: string;
  role: string;
}

export enum UserRoles {
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  CUSTOMER = "CUSTOMER",
}
