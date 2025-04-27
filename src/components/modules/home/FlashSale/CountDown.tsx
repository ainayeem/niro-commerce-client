"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TimeUnit = "hours" | "minutes" | "seconds";
type TimeLeft = Record<TimeUnit, number>;

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      hours,
      minutes,
      seconds,
    };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2 sm:gap-3">
        {(["hours", "minutes", "seconds"] as const).map((unit, index) => (
          <div key={unit} className="flex flex-col items-center">
            <motion.div
              className={`relative w-14 sm:w-16 h-14 sm:h-16 rounded-lg overflow-hidden shadow-sm ${
                unit === "seconds"
                  ? "bg-gradient-to-b from-emerald-100 to-emerald-200 border border-emerald-200"
                  : "bg-green-50 border border-green-100"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {unit === "seconds" && (
                <motion.div
                  className="absolute inset-0 bg-emerald-300/20 rounded-lg"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  key={timeLeft[unit]}
                  className={`text-xl sm:text-2xl font-bold ${unit === "seconds" ? "text-emerald-600" : "text-gray-800"}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {timeLeft[unit].toString().padStart(2, "0")}
                </motion.span>
              </div>
            </motion.div>
            <span className={`mt-1 text-xs font-medium ${unit === "seconds" ? "text-emerald-500" : "text-gray-500"}`}>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
