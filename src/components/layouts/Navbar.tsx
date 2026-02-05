"use client";

import { LayoutDashboard, LogOut, Menu, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserRoles } from "@/types";
import { toast } from "sonner";
import { CartBadge } from "../modules/cart/CartBadge";
import Logo from "./Logo";

interface MenuItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

const Navbar = ({
  logo = { url: "/", src: "/logo.png", alt: "logo", title: "MEDI STORE" },
  menu = [
    { title: "HOME", url: "/" },
    { title: "MEDICINES", url: "/medicines" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user as User | undefined;
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully.");
          setIsOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (!mounted) {
    return (
      <header className="py-3 sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80 h-18.25" />
    );
  }

  return (
    <header
      className={cn(
        "py-3 sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80 transition-all",
        className,
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* --- Left: Logo & Desktop Links --- */}
          <div className="flex items-center gap-8">
            <Logo />

            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-1">
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className="group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* --- Right: User Menu / Auth & Theme --- */}
          <div className="flex items-center gap-2 md:gap-4">
            <ModeToggle />

            {user && user.role === UserRoles.CUSTOMER ? <CartBadge /> : null}

            {/* Desktop User Dropdown */}
            {user ? (
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 border border-slate-200 dark:border-slate-800 hover:ring-4 hover:ring-blue-500/10 transition-all cursor-pointer"
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={user.image || ""}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-blue-600 text-white font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-64 mt-2 p-2 rounded-2xl shadow-2xl border-slate-200/60 dark:border-slate-800/60"
                    align="end"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-0.5 px-2 py-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                        <span className="text-xs text-slate-500 truncate font-medium">
                          {user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        asChild
                        className="rounded-lg h-10 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-600"
                      >
                        <Link href={`${dashboardLink}`}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span className="font-semibold">Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-lg h-10 cursor-pointer text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-900/20 focus:text-rose-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="font-semibold">Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className="font-bold text-slate-600 dark:text-slate-400"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl shadow-lg shadow-blue-600/20"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden rounded-xl border-slate-200 dark:border-slate-800"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-87.5 p-0 flex flex-col border-l border-slate-200 dark:border-slate-800"
              >
                <SheetHeader className="p-6 text-left border-b border-slate-100 dark:border-slate-900">
                  <SheetTitle className="flex items-center gap-2">
                    <Image
                      src={logo.src}
                      width={32}
                      height={32}
                      alt="logo"
                      className="dark:invert"
                    />
                    <span className="font-black tracking-tight">
                      {logo.title}
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                  {/* User Section for Mobile */}
                  {user && (
                    <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                          <AvatarImage src={user.image || ""} />
                          <AvatarFallback className="bg-blue-600 text-white font-bold">
                            {user.name?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-white leading-tight">
                            {user.name}
                          </span>
                          <span className="text-xs text-slate-500 truncate max-w-37.5">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        asChild
                        variant="secondary"
                        className="w-full justify-between h-10 rounded-xl"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={`${dashboardLink}`}>
                          <div className="flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                          </div>
                          <ChevronRight className="h-4 w-4 opacity-50" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
                      Navigation
                    </p>

                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                      className="flex lg:hidden items-center justify-between p-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50"
                    >
                      MY CART
                      <ChevronRight className="h-4 w-4 opacity-20" />
                    </Link>

                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                      >
                        {item.title}
                        <ChevronRight className="h-4 w-4 opacity-20" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 dark:border-slate-900 space-y-3">
                  {user ? (
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full h-12 rounded-xl font-bold"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full h-12 rounded-xl font-bold"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full h-12 rounded-xl font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export { Navbar };
