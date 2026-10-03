"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  onComplete: () => void;
}

const countdownItems = ["3", "2", "1", "GO"];

export default function Countdown({ onComplete }: CountdownProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < countdownItems.length) {
      const timer = setTimeout(
        () => {
          setIndex((prev) => prev + 1);
        },
        index === countdownItems.length - 1 ? 600 : 800,
      );
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [index, onComplete]);

  return (
    <div className="countdown-overlay">
      <AnimatePresence mode="wait">
        {index < countdownItems.length && (
          <motion.div
            key={countdownItems[index]}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`countdown-text ${countdownItems[index] === "GO" ? "countdown-go" : ""}`}
          >
            {countdownItems[index]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
