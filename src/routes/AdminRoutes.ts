import { Route } from "@/types";
import { LayoutDashboard, User } from "lucide-react";

export const AdminRoutes: Route[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: User,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Manage Medicines",
        url: "/admin-dashboard/medicines-list",
        icon: LayoutDashboard,
      },
      {
        title: "Orders History",
        url: "/admin-dashboard/orders-history",
        icon: LayoutDashboard,
      },
    ],
  },
];
