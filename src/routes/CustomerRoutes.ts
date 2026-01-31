import { Route } from "@/types";

export const CustomerRoutes: Route[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/customer-dashboard",
      },
      {
        title: "Admin",
        url: "/admin-dashboard",
      },
      {
        title: "Seller",
        url: "/seller-dashboard",
      },
    ],
  },
];
