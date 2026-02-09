import { Route } from "@/types";
import { LayoutDashboard, User, Pill, ClipboardList, Tags } from "lucide-react";

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
    ],
  },
  {
    title: "Marketplace Control",
    items: [
      {
        title: "Manage Medicines",
        url: "/admin-dashboard/medicines-list",
        icon: Pill,
      },
      {
        title: "Manage Categories",
        url: "/admin-dashboard/categories",
        icon: Tags,
      },
      {
        title: "Orders History",
        url: "/admin-dashboard/orders-history",
        icon: ClipboardList,
      },
    ],
  },
];
