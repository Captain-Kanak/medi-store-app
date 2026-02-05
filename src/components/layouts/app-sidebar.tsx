"use client"; // Required for usePathname

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Route, User } from "@/types";
import Link from "next/link";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { SellerRoutes } from "@/routes/SellerRoutes";
import { CustomerRoutes } from "@/routes/CustomerRoutes";
import { NavUser } from "../modules/dashboard/NavUser";
import Logo from "./Logo";
import { cn } from "@/lib/utils"; // Shadcn utility for merging classes

export function AppSidebar({
  user,
  ...props
}: {
  user: User;
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

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
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-2">
                {group.items.map((item) => {
                  const isActive =
                    item.url === "/customer-dashboard" ||
                    item.url === "/admin-dashboard" ||
                    item.url === "/seller-dashboard"
                      ? pathname === item.url
                      : pathname.startsWith(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "relative flex items-center gap-3 px-3 py-5 transition-all duration-200 rounded-xl group",
                          isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-600 hover:text-white"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                        )}
                      >
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon
                              className={cn(
                                "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                                isActive
                                  ? "text-white"
                                  : "text-slate-400 group-hover:text-slate-600",
                              )}
                            />
                          )}
                          <span className="font-semibold tracking-tight">
                            {item.title}
                          </span>

                          {/* Modern Active Indicator */}
                          {isActive && (
                            <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
