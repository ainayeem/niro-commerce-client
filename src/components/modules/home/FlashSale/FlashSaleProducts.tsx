"use client";

import { Button } from "@/components/ui/button";
import type { IProduct } from "@/types";
import { motion } from "framer-motion";
import { ChevronRightCircle, Zap } from "lucide-react";
import Link from "next/link";
import CountDown from "./CountDown";
import FlashSaleProductCard from "./FlashSaleProductCard";

interface FlashSaleProductsProps {
  products: IProduct[];
}

const FlashSaleProducts = ({ products }: FlashSaleProductsProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 opacity-80"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-gradient-to-br from-emerald-200 to-emerald-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-gradient-to-br from-red-200 to-red-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="hidden md:block absolute top-10 right-10 text-emerald-200 opacity-30">
          <Zap size={60} strokeWidth={1} />
        </div>
        <div className="hidden md:block absolute bottom-10 left-10 text-emerald-200 opacity-30 rotate-12">
          <Zap size={40} strokeWidth={1} />
        </div>
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:justify-start">
              <div className="flex items-center gap-3">
                {/* <Flame size={28} className="text-emerald-500" /> */}
                <h2 className="font-bold text-2xl text-emerald-500">Flash Sale</h2>
              </div>
              <div className="w-full sm:w-auto flex justify-center">
                <CountDown />
              </div>
            </div>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <Link href="/products">
                <Button
                  variant="outline"
                  className="rounded-lg border-emerald-500/20 hover:bg-emerald-700 hover:text-secondary transition-all duration-300"
                >
                  View All Deals
                  <ChevronRightCircle className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-10 w-full h-px bg-gray-200"></div>
        </div>
        {products.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {products.map((product: IProduct, idx: number) => (
              <motion.div key={product._id || idx} variants={item}>
                <FlashSaleProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xl border border-emerald-100">
            <Zap size={40} className="mx-auto text-emerald-300 mb-3" />
            <p className="text-gray-500">No flash sale products available at the moment.</p>
          </div>
        )}

        <div className="mt-10 text-center md:hidden">
          <Link href="/products">
            <Button className="rounded-full px-6 bg-emerald-500 hover:bg-emerald-600 text-white shadow-md">
              See More Deals
              <ChevronRightCircle className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleProducts;
