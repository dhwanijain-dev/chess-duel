"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  onComplete: () => void;
}

export default function Countdown({ onComplete }: CountdownProps) {
  useEffect(() => {
    // Keep the loader visible for approximately 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="countdown-overlay">
      <div className="opponent-loader">
        {/* Rotating rectangular scanner */}
        <motion.div
          className="scanner-beam"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <img src="logo.png" alt="Opponent Avatar" style={{height:"50px"}}/>
        {/* Outer circle - 240px */}
        <div className="radar-circle radar-outer" />

        {/* Middle circle - 160px */}
        <div className="radar-circle radar-middle" />

        {/* Smallest circle - 80px */}
        <div className="radar-circle radar-inner" />
      </div>
    </div>
  );
}