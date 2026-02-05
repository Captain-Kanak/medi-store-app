import { Route } from "@/types";
import { LayoutDashboard, ShoppingCart, User } from "lucide-react";

export const CustomerRoutes: Route[] = [
  {
    title: "customer Panel",
    items: [
      {
        title: "Overview",
        url: "/customer-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Profile",
        url: "/customer-dashboard/profile",
        icon: User,
      },
      {
        title: "My Orders",
        url: "/customer-dashboard/orders",
        icon: ShoppingCart,
      },
    ],
  },
];
