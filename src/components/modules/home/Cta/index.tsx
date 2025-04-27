"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, ShoppingBag, Star, Users } from "lucide-react";

const CTA = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const statVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const floatingAnimation = {
    y: ["-0.5rem", "0.5rem"],
    transition: {
      y: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  // Stats data with icons
  const stats = [
    { value: "10K+", label: "Products", icon: ShoppingBag },
    { value: "24/7", label: "Support", icon: Clock },
    { value: "100K+", label: "Happy Customers", icon: Users },
    { value: "4.9/5", label: "Customer Rating", icon: Star },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Background with modern gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 z-0"></div>

          {/* Mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMC41IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=')]"></div>

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={floatingAnimation}
              className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"
            ></motion.div>
            <motion.div
              animate={floatingAnimation}
              custom={1}
              className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"
            ></motion.div>

            {/* Modern decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
            <div className="absolute top-1/3 left-1/3 w-8 h-8 bg-white/10 rounded-full"></div>

            {/* Diagonal lines */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-white/0 via-white/20 to-white/0 transform -rotate-45"></div>
              <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-white/0 via-white/10 to-white/0 transform -rotate-45"></div>
            </div>
          </div>

          <div className="relative z-10 py-16 sm:py-20 md:py-24 px-6 sm:px-12 lg:px-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8 lg:gap-16">
            {/* Left Side - Text and Buttons */}
            <div className="max-w-2xl text-center md:text-left">
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                  Limited Time Offer
                </span>
              </motion.div>

              <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Shopping Experience
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-white/90 text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed"
              >
                Join thousands of satisfied customers who have discovered the perfect products for their needs. Sign up today and get 15% off your
                first order.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-white/90 hover:text-emerald-700 rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>

                <Button
                  size="lg"
                  className="text-white border-white/30 hover:bg-white/10 rounded-full px-8 py-6 text-base font-medium backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </motion.div>
              <motion.ul variants={itemVariants} className="mt-8 space-y-2 text-white/90 text-sm sm:text-base max-w-xl mx-auto md:mx-0">
                {["Free shipping on orders over $50", "30-day money-back guarantee", "Secure checkout process"].map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5 text-white" />
                    {benefit}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Right Side - Stats with modern cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-md sm:max-w-lg md:max-w-none">
              {stats.map((stat, index) => (
                <motion.div key={index} variants={statVariants} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="group relative">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl blur-sm transform group-hover:scale-105 transition-transform duration-300"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 overflow-hidden">
                    {/* Stat icon */}
                    <div className="absolute right-4 top-4 opacity-20 text-white">
                      <stat.icon className="h-12 w-12" />
                    </div>

                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/80 text-sm sm:text-base font-medium">{stat.label}</div>

                    {/* Decorative gradient line */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-white/0 via-white/50 to-white/0"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
