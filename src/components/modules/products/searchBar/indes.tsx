"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import { searchProducts } from "@/services/ProductService";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, TrendingUp, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  offerPrice: number | null;
  imageUrls: string[];
  slug?: string;
}

const SearchBar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        const { data } = await searchProducts(debouncedQuery);
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSearch = () => {
    if (!query.trim()) return;

    setOpen(false);
    router.push(`/products?searchTerm=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const popularSearches = ["smartphone", "laptop", "headphone", "camera", "watch", "tv"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex-1 max-w-2xl mx-2 md:mx-5">
          {/* Always visible search input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md -z-10"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
              <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                onClick={() => setOpen(true)}
                className="w-full h-12  border border-gray-200 bg-white py-2 pl-12 pr-4 text-base shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:border-emerald-300 group-hover:border-emerald-200 group-hover:shadow-md rounded-full"
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-emerald-50 hover:text-emerald-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-full min-w-[300px] p-0 border border-gray-200 shadow-lg rounded-xl overflow-hidden"
        align="start"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="max-h-[500px] overflow-y-auto">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
                <span className="ml-2 text-sm text-gray-500">Searching...</span>
              </motion.div>
            )}

            {!loading && query.length >= 2 && products.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-8 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-emerald-300" />
                </div>
                <p className="text-gray-500 text-sm">No products found for &quot;{query}&quot;</p>
                <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
              </motion.div>
            )}

            {!loading && products.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-2">
                {products.map((product, index) => (
                  <motion.div key={product._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Link
                      href={`/products/${product._id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-gray-100 flex-shrink-0 border border-gray-200">
                        <Image src={product.imageUrls[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-gray-800 truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {product.offerPrice ? (
                            <>
                              <p className="text-base font-semibold text-emerald-600">${product.offerPrice}</p>
                              <p className="text-sm text-gray-400 line-through">${product.price}</p>
                            </>
                          ) : (
                            <p className="text-base font-semibold text-gray-700">${product.price}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}

                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 font-medium text-sm py-2"
                    onClick={handleSearch}
                  >
                    View all results for &quot;{query}&quot;
                  </Button>
                </div>
              </motion.div>
            )}

            {!loading && query.length < 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 px-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-sm font-medium text-gray-500">POPULAR SEARCHES</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      className="px-4 py-2 bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 rounded-lg text-sm border border-gray-200 hover:border-emerald-200 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchBar;
