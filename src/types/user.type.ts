export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  role: string;
  phone?: string;
  address?: string;
  isBlocked: boolean;
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
