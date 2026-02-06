import {
  LayoutDashboard,
  User,
  Pill,
  ClipboardList,
  PlusCircle,
} from "lucide-react";
import { Route } from "@/types";

export const SellerRoutes: Route[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/seller-dashboard/profile",
        icon: User,
      },
    ],
  },
  {
    title: "Seller Management",
    items: [
      {
        title: "Overview",
        url: "/seller-dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Inventory",
        url: "/seller-dashboard/medicines-inventory",
        icon: Pill,
      },
      {
        title: "Add Medicine",
        url: "/seller-dashboard/add-medicine",
        icon: PlusCircle,
      },
      {
        title: "Manage Orders",
        url: "/seller-dashboard/manage-orders",
        icon: ClipboardList,
      },
    ],
  },
];
