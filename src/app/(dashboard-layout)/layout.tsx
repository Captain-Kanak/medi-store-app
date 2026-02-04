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
import { User } from "@/types";

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

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex w-full items-center justify-end">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {user.role === "ADMIN"
            ? admin
            : user.role === "SELLER"
              ? seller
              : customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
