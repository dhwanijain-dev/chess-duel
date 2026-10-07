"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, SmilePlus } from "lucide-react";
import type { DuelResultData } from "@/lib/chess/game";

interface DuelResultProps {
  result: DuelResultData;
  onPlayAgain: () => void;
  onBack?: () => void;
  onNewSprint?: () => void;

  // Optional display information
  playerName?: string;
  opponentName?: string;
  playerTime?: string;
  opponentTime?: string;
}

export default function DuelResult({
  result,
  onPlayAgain,
  onBack,
  onNewSprint,
  playerName = "dhwanijain",
  opponentName = "nadinivijayvargiya",
  playerTime = "19:47",
  opponentTime = "19:80",
}: DuelResultProps) {
  const isDraw = result.playerSolved === result.opponentSolved;

  const resultTitle = result.won
    ? "YOU WIN"
    : isDraw
      ? "DRAW"
      : "YOU LOSE";

  return (
    <AnimatePresence>
      <motion.div
        className="duel-result-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        id="duel-result"
      >
        <motion.div
          className="duel-result-card"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Subtle perspective grid */}
          <div className="duel-grid" />

          {/* Back button */}
          <motion.button
            className="duel-back-button"
            onClick={onBack}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Go back"
          >
            <ArrowLeft size={24} strokeWidth={1.8} />
          </motion.button>

          <div className="duel-result-content">
            {/* Result title */}
            <motion.div
              className={`duel-result-heading ${
                result.won
                  ? "result-win"
                  : isDraw
                    ? "result-draw"
                    : "result-loss"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {resultTitle}

              {/* Sprint Duel badge */}
              <motion.span
                className="duel-mode-badge"
                initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
                animate={{ opacity: 1, rotate: -8, scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.35,
                  ease: "backOut",
                }}
              >
                CHESS DUEL
              </motion.span>
            </motion.div>

            {/* Score comparison */}
            <motion.div
              className="duel-score-area"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
            >
              {/* Player */}
              <div className="duel-player">
                <div
                  className="duel-score score-winner"
                >
                  {result.playerSolved}
                </div>

                <div className="duel-player-name">
                  <span className="duel-avatar duel-avatar-player">
                    👤
                  </span>
                  <span>{playerName}</span>
                </div>

                <div className="duel-player-meta">
                  <span>{playerTime}</span>

                  <span
                    className={`duel-rating ${
                      result.won ? "rating-positive" : "rating-neutral"
                    }`}
                  >
                    {result.won ? "▲ 6" : "▼ 6"}
                  </span>
                </div>
              </div>

              {/* Center */}
              <div className="duel-vs">
                <span>-</span>
              </div>

              {/* Opponent */}
              <div className="duel-player">
                <div
                  className="duel-score score-loser"
                >
                  {result.opponentSolved}
                </div>

                <div className="duel-player-name">
                  <span className="duel-avatar duel-avatar-opponent">
                    ☁
                  </span>
                  <span>{opponentName}</span>
                </div>

                <div className="duel-player-meta">
                  <span>{opponentTime}</span>

                  <span className="duel-rating rating-neutral">
                    ▼ 6
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Reaction */}
            <motion.button
              className="duel-reaction"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <SmilePlus size={19} strokeWidth={2} />
              <span>Send a Reaction</span>
            </motion.button>

            {/* Bottom actions */}
            <motion.div
              className="duel-result-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.4 }}
            >
              <motion.button
                className="duel-rematch-button"
                onClick={onPlayAgain}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                REMATCH
              </motion.button>

              <motion.button
                className="duel-new-sprint-button"
                onClick={onNewSprint ?? onPlayAgain}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={15} fill="currentColor" />
                <span>NEW MATH SPRINT</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}