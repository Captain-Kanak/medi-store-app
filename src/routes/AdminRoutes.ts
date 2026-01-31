import { Route } from "@/types";

export const AdminRoutes: Route[] = [
  {
    title: "Administration",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard",
      },
      {
        title: "Seller",
        url: "/seller-dashboard",
      },
      {
        title: "Customer",
        url: "/customer-dashboard",
      },
    ],
  },
];
