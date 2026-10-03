"use client";

import { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import type { PieceDropHandlerArgs } from "react-chessboard";
import { motion } from "framer-motion";

interface ChessBoardProps {
  position: string; // FEN
  onPieceDrop: (source: string, target: string) => boolean;
  boardWidth: number;
  disabled: boolean;
  moveStatus: "idle" | "correct" | "incorrect";
}

export default function ChessBoard({
  position,
  onPieceDrop,
  boardWidth,
  disabled,
  moveStatus,
}: ChessBoardProps) {
  const options = useMemo(
    () => ({
      position,
      darkSquareStyle: { backgroundColor: "#2a5a3a" } as React.CSSProperties,
      lightSquareStyle: { backgroundColor: "#3a7a50" } as React.CSSProperties,
      boardStyle: {
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        width: `${boardWidth}px`,
        height: `${boardWidth}px`,
      } as React.CSSProperties,
      dropSquareStyle: {
        boxShadow: "inset 0 0 1px 6px rgba(0, 201, 107, 0.5)",
      } as React.CSSProperties,
      animationDurationInMs: 200,
      allowDragging: !disabled,
      onPieceDrop: ({ sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
        if (disabled || !targetSquare) return false;
        return onPieceDrop(sourceSquare, targetSquare);
      },
    }),
    [position, boardWidth, disabled, onPieceDrop],
  );

  const shakeClass = moveStatus === "incorrect" ? "board-shake" : "";
  const glowClass = moveStatus === "correct" ? "board-glow" : "";

  return (
    <motion.div
      className={`chess-board-container ${shakeClass} ${glowClass}`}
      id="chess-board"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: boardWidth, height: boardWidth }}
    >
      <Chessboard options={options} />
    </motion.div>
  );
}
