"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { DuelResultData } from "@/lib/chess/game";

interface DuelResultProps {
  result: DuelResultData;
  onNextPuzzle: () => void;
}

export default function DuelResult({ result, onNextPuzzle }: DuelResultProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  // Animated score count-up
  useEffect(() => {
    const target = result.scoreGained;
    const duration = 1000; // ms
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setDisplayScore(current);
      if (step >= steps) {
        clearInterval(timer);
        // Show details after score animation completes
        setTimeout(() => setShowDetails(true), 300);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result.scoreGained]);

  return (
    <AnimatePresence>
      <motion.div
        className="duel-result-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        id="duel-result"
      >
        <div className="duel-result-content">
          {/* Win/Loss Title */}
          <motion.div
            className={`duel-result-title ${result.won ? "result-win" : "result-loss"}`}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
          >
            {result.won ? "YOU WIN" : "YOU LOSE"}
          </motion.div>

          {/* Score */}
          <motion.div
            className="duel-result-score"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            +{displayScore}
          </motion.div>

          {/* Time Comparison */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                className="duel-result-times"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="duel-result-time-row">
                  <span className="duel-result-time-label">You</span>
                  <span className="duel-result-time-value">
                    {result.playerTime.toFixed(2)}s
                  </span>
                </div>
                <div className="duel-result-vs">VS</div>
                <div className="duel-result-time-row">
                  <span className="duel-result-time-label">Opponent</span>
                  <span className="duel-result-time-value">
                    {result.opponentTime.toFixed(2)}s
                  </span>
                </div>
                <div
                  className={`duel-result-diff ${result.won ? "result-diff-win" : "result-diff-loss"}`}
                >
                  {result.timeDifference.toFixed(2)}s{" "}
                  {result.won ? "FASTER" : "SLOWER"}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Puzzle Button */}
          <motion.button
            className="duel-result-next"
            onClick={onNextPuzzle}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            id="btn-next-puzzle"
          >
            NEXT PUZZLE
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
