import { Route } from "@/types";
import { LayoutDashboard, ShoppingCart, User } from "lucide-react";

export const CustomerRoutes: Route[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/customer-dashboard/profile",
        icon: User,
      },
    ],
  },
  {
    title: "Customer Management",
    items: [
      {
        title: "Overview",
        url: "/customer-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "My Orders",
        url: "/customer-dashboard/orders",
        icon: ShoppingCart,
      },
    ],
  },
];
