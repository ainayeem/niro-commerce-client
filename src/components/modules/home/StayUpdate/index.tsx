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
        className={`${styles.banner} border-2 border-white rounded-3xl my-6 md:my-10 overflow-hidden`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ x: -20 }} whileInView={{ x: 0 }} transition={{ delay: 0.2 }} className="px-6 lg:pl-12 py-12 md:py-16 lg:mt-24">
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-normal text-white"
            >
              Stay Updated with Exclusive Offers!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="my-3 text-base sm:text-lg md:text-xl text-[#d1f7a5]"
            >
              Save big with unbeatable deals on tech, home essentials, fashion, and more!
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 mt-6"
            >
              <Input placeholder="Enter Your Email" className="rounded-full bg-white/90 focus:bg-white transition-all" />
              <Button className="rounded-full border-2 border-white bg-transparent hover:bg-white/20 transition-all">Subscribe</Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </NCContainer>
  );
};

export default StayUpdate;
