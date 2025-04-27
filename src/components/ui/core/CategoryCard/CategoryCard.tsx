"use client";

import { ICategory } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";

const CategoryCard = ({ category }: { category: ICategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 10,
        hover: { duration: 0.2 },
      }}
      className="bg-white bg-opacity-50 border-2 border-white rounded-2xl text-center p-6 h-44 cursor-pointer hover:bg-opacity-70 transition-all duration-300"
    >
      <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
        <Image src={category?.icon} width={100} height={150} alt="category icon" className="mx-auto" />
      </motion.div>
      <motion.h3 className="text-lg font-semibold truncate mt-3" whileHover={{ color: "#4ac18a" }}>
        {category?.name}
      </motion.h3>
    </motion.div>
  );
};

export default CategoryCard;
