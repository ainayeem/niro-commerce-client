"use client";

import Logo from "@/assets/svgs/Logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
// import { selectWishlistCount } from "@/redux/features/wishListSlice";
import { useAppSelector } from "@/redux/hooks";
import { ShoppingBag, StoreIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import SearchBar from "../modules/products/searchBar/indes";
import NavUser from "./NavUser";

interface NavbarProps {
  className?: string;
  logoOnly?: boolean;
  hideSearch?: boolean;
  transparent?: boolean;
}

const Navbar = ({ className, logoOnly = false, hideSearch = false, transparent = false }: NavbarProps) => {
  const { user } = useUser();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const products = useAppSelector(orderedProductsSelector);

  // const wishlistCount = useAppSelector(selectWishlistCount);

  return (
    <header
      className={cn(
        " top-0 left-0 right-0 z-50 w-full transition-all duration-200 md:px-4 bg-gray-200/60 sticky",
        scrolled || !transparent ? "border-b border-primary/30 shadow-sm bg-gray-200/60" : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/">
          <h1 className="text-2xl flex items-center gap-2 font-bold text-emerald-600">
            <Logo />
            <span className="hidden md:block">Nirocom</span>
          </h1>
        </Link>

        {!logoOnly && (
          <>
            {/* Search - Responsive width */}
            {!hideSearch && <SearchBar />}

            <div className="flex items-center gap-2">
              {/* <Link href="/wishlist" className="hidden sm:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full relative h-9 w-9 hover:bg-emerald-50"
                >
                  <Heart className="h-[18px] w-[18px] text-slate-600" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-emerald-500 text-white">
                    {wishlistCount}
                  </Badge>
                </Button>
              </Link> */}

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="rounded-full relative h-9 w-9 bg-emerald-50">
                  <ShoppingBag className="h-[18px] w-[18px] text-slate-600" />

                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-[10px] bg-emerald-500 text-white">
                    {products.length}
                  </Badge>
                </Button>
              </Link>

              {user ? (
                <>
                  {!user.hasShop && (
                    <Link href="/create-shop" className="hidden sm:block">
                      <Button
                        variant="outline"
                        className="rounded-full text-emerald-600 font-medium h-9 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                        size="sm"
                      >
                        <StoreIcon className="mr-1.5 h-3.5 w-3.5" />
                        Create Shop
                      </Button>
                    </Link>
                  )}

                  <div className="ml-1">
                    <NavUser />
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="default" className="rounded-full h-9 bg-emerald-500 hover:bg-emerald-600 text-white" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
