"use client";

import drone from "@/assets/drone.png";
import headphone from "@/assets/headphone.png";
import headphone2 from "@/assets/headphone2.png";
import vr from "@/assets/vr.png";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./TrendyProductSection.module.css";

const trendyProducts = [
  {
    id: 1,
    name: "Logitech Gaming Headphone",
    price: 150.99,
    originalPrice: 175.99,
    image: headphone2,
  },
  {
    id: 2,
    name: "Fantech Headphone",
    price: 150.99,
    originalPrice: 175.99,
    image: vr,
  },
  {
    id: 3,
    name: "Premium Headset",
    price: 150.99,
    originalPrice: 175.99,
    image: drone,
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const TrendyProductSection = () => {
  return (
    <NCContainer>
      <motion.div
        className="container mx-auto mt-10 lg:mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6" variants={containerVariants}>
          {/* Featured Card */}
          <motion.div
            className="flex flex-col items-center border-2 border-white rounded-3xl bg-[#f8f8f8] overflow-hidden hover:shadow-xl transition-shadow duration-300"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <div className="relative w-full aspect-square">
              <Image src={headphone} width={400} height={400} className="object-cover" alt="Trendy Headphones" />
            </div>
            <div className={`${styles.bgViolate} space-y-4 w-full rounded-2xl flex flex-col items-center p-6 h-full`}>
              <h1 className="font-bold text-xl lg:text-2xl text-center text-gray-700">Trendy Products</h1>
            </div>
          </motion.div>

          {/* Product Cards */}
          {trendyProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex flex-col items-center border-2 border-white rounded-3xl bg-[#f8f8f8] overflow-hidden hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              custom={index}
            >
              <div className="relative w-full aspect-square">
                <Image src={product.image} fill className="object-cover" alt={product.name} />
              </div>
              <div className={`${styles.bgViolate} space-y-4 w-full rounded-2xl flex flex-col items-center p-6 h-full`}>
                <h1 className="font-bold text-lg lg:text-xl text-center line-clamp-2 text-gray-700">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl ">${product.price.toFixed(2)}</span>
                  {/* <span className="line-through text-lg">${product.originalPrice.toFixed(2)}</span> */}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </NCContainer>
  );
};

export default TrendyProductSection;
