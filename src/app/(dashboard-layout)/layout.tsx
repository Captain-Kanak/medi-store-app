import { AppSidebar } from "@/components/layouts/app-sidebar";
import { ModeToggle } from "@/components/layouts/ModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { userService } from "@/services/user.service";
import { User, UserRoles } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

export default async function DashboardLayout({
  admin,
  seller,
  customer,
}: Readonly<{
  admin: React.ReactNode;
  seller: React.ReactNode;
  customer: React.ReactNode;
}>) {
  const { data } = await userService.getSession();
  const user = data?.user as User;
  let dashboardLink = "";

  switch (user?.role) {
    case UserRoles.ADMIN:
      dashboardLink = "/admin-dashboard";
      break;

    case UserRoles.SELLER:
      dashboardLink = "/seller-dashboard";
      break;

    case UserRoles.CUSTOMER:
      dashboardLink = "/customer-dashboard";
      break;

    default:
      dashboardLink = "/customer-dashboard";
  }

  const roleColors: Record<string, string> = {
    ADMIN: "bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-900",
    SELLER:
      "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900",
    CUSTOMER:
      "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900",
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-slate-50/50 dark:bg-slate-950/50">
        {/* Fancy Sticky Header with Glassmorphism */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 px-6 backdrop-blur-md dark:bg-slate-900/80 transition-all">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={dashboardLink}
                    className="font-medium text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-slate-900 dark:text-white capitalize">
                    {user.role.toLowerCase()} Panel
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            {/* Role Indicator Badge */}
            <Badge
              variant="outline"
              className={`hidden sm:flex px-3 py-1 rounded-full font-bold tracking-tight ${roleColors[user.role]}`}
            >
              {user.role}
            </Badge>

            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

            <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 border-2 border-white dark:border-slate-900" />
            </button>

            <ModeToggle />
          </div>
        </header>

        {/* Main Content Area with Fade-in Animation */}
        <main className="flex flex-1 flex-col p-6 animate-in fade-in duration-500">
          <div className="mx-auto w-full max-w-7xl">
            {user.role === "ADMIN"
              ? admin
              : user.role === "SELLER"
                ? seller
                : customer}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
