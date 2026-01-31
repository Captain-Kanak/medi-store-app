export interface UserType {
  name: string;
  role: string;
}

export enum UserRoles {
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  CUSTOMER = "CUSTOMER",
}
