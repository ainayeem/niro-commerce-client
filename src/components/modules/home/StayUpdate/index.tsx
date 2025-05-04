"use client";

import { Button } from "@/components/ui/button";
import NCContainer from "@/components/ui/core/NCContainer/NCContainer";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import styles from "./StayUpdate.module.css";

const StayUpdate = () => {
  return (
    <NCContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${styles.banner} border-2 border-white/30 rounded-3xl my-8 md:my-12 lg:my-16 overflow-hidden backdrop-blur-sm`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ x: -20 }} 
            whileInView={{ x: 0 }} 
            transition={{ delay: 0.2 }} 
            className="px-6 lg:pl-12 py-12 md:py-16 lg:py-20"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-4"
            >
              Stay Updated with <span className="text-[#d1f7a5]">Exclusive</span> Offers!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
            >
              Save big with unbeatable deals on tech, home essentials, fashion, and more! Join our newsletter for the latest updates.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 max-w-xl"
            >
              <Input 
                placeholder="Enter Your Email" 
                className="rounded-full bg-white/90 focus:bg-white transition-all h-12 text-base" 
              />
              <Button 
                className="rounded-full border-2 border-white bg-transparent hover:bg-white/20 transition-all h-12 text-base font-medium"
              >
                Subscribe Now
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden lg:block relative h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </motion.div>
        </div>
      </motion.div>
    </NCContainer>
  );
};

export default StayUpdate;
