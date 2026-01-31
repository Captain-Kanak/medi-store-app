import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Route, UserType } from "@/types";
import Link from "next/link";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { SellerRoutes } from "@/routes/SellerRoutes";
import { CustomerRoutes } from "@/routes/CustomerRoutes";

export function AppSidebar({
  user,
  ...props
}: {
  user: UserType & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case "ADMIN":
      routes = AdminRoutes;
      break;

    case "SELLER":
      routes = SellerRoutes;
      break;

    case "CUSTOMER":
      routes = CustomerRoutes;
      break;

    default:
      routes = [];
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
