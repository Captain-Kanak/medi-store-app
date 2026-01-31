import { Route } from "@/types";

export const SellerRoutes: Route[] = [
  {
    title: "Inventory Management",
    items: [
      {
        title: "Overview",
        url: "/seller-dashboard",
      },
      {
        title: "Admin",
        url: "/admin-dashboard",
      },
      {
        title: "Customer",
        url: "/customer-dashboard",
      },
    ],
  },
];
