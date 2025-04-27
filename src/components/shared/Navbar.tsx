"use client";

import Logo from "@/assets/svgs/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { protectedRoutes } from "@/constants";
import { useUser } from "@/context/UserContext";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { logout } from "@/services/AuthService";
import { Heart, LogOut, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "../modules/products/searchBar/indes";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const products = useAppSelector(orderedProductsSelector);

  return (
    <header className="border-b w-full sticky top-0 z-50 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <Link href="/" className="flex items-center gap-2 mb-8">
                  <Logo />
                  <h1 className="text-xl font-bold text-emerald-600">Nirocom</h1>
                </Link>
                <nav className="flex flex-col gap-4">
                  {user && (
                    <>
                      <Link href="/create-shop">
                        <Button variant="outline" className="w-full">
                          Create Shop
                        </Button>
                      </Link>
                      <Link href={`/${user?.role}/dashboard`}>
                        <Button variant="ghost" className="w-full justify-start">
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/profile">
                        <Button variant="ghost" className="w-full justify-start">
                          Profile
                        </Button>
                      </Link>
                    </>
                  )}
                  <Link href="/wishlist">
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </Button>
                  </Link>
                  {user ? (
                    <Button variant="destructive" className="w-full justify-start mt-auto mb-4" onClick={handleLogOut}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Button>
                  ) : (
                    <Link href="/login">
                      <Button className="w-full mt-auto">Login</Button>
                    </Link>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <h1 className="hidden text-xl font-bold text-emerald-600 sm:block">Nirocom</h1>
          </Link>
        </div>

        {/* Search bar - hidden on mobile */}
        <div className="hidden mx-4 lg:flex lg:flex-1 lg:max-w-2xl">
          <SearchBar />
        </div>

        {/* Desktop navigation */}
        <nav className="flex items-center gap-2">
          {/* Wishlist */}
          {/* <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Heart className="w-5 h-5" />
            <span className="sr-only">Wishlist</span>
          </Button> */}

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative h-9 w-9 hover:bg-emerald-50">
              <ShoppingBag className="h-[18px] w-[18px] text-slate-600" />

              <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-emerald-500 text-white">
                {products.length}
              </Badge>
            </Button>
          </Link>

          {/* User dropdown */}
          {user ? (
            <div className="hidden sm:flex sm:items-center sm:gap-2">
              <Link href="/create-shop">
                <Button variant="outline" className="hidden md:inline-flex">
                  Create Shop
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage />
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${user?.role}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-shop">My Shop</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer font-medium" onClick={handleLogOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="hidden sm:inline-flex">
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile search bar - shown only on mobile */}
      <div className="lg:hidden px-4 pb-3">
        <SearchBar />
      </div>
    </header>
  );
}
