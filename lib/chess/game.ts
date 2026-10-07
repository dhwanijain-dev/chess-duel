import { Chess, type Move } from "chess.js";
import type { ChessPuzzle } from "@/data/chessPuzzles";

// ── Game States ──────────────────────────────────────────────
export type GameState =
  | "IDLE"
  | "COUNTDOWN"
  | "PLAYING"
  | "TIMEOUT"
  | "RESULT";

// ── Player Data ──────────────────────────────────────────────
export interface PlayerData {
  name: string;
  rating: number;
  score: number;
  avatar?: string;
}

// ── Duel Result ──────────────────────────────────────────────
export interface DuelResultData {
  playerSolved: number;
  opponentSolved: number;
  won: boolean;
  difference: number;
  totalPoints: number;
}

// ── Move helpers ─────────────────────────────────────────────

/**
 * Convert a chess.js Move object to a UCI string (e.g. "e1e8").
 * Handles promotions by appending the piece letter.
 */
export function moveToUci(move: Move): string {
  let uci = move.from + move.to;
  if (move.promotion) {
    uci += move.promotion;
  }
  return uci;
}

/**
 * Check whether a player's move matches the current step in the
 * puzzle solution sequence.
 *
 * For multi-move puzzles, `stepIndex` indicates which solution
 * move we are comparing against.
 */
export function isSolutionMove(
  puzzle: ChessPuzzle,
  move: Move,
  stepIndex: number = 0,
): boolean {
  const expectedUci = puzzle.solution.uci[stepIndex];
  if (!expectedUci) return false;
  return moveToUci(move) === expectedUci;
}

/**
 * Create a fresh Chess instance loaded with the puzzle FEN.
 */
export function createGameFromPuzzle(puzzle: ChessPuzzle): Chess {
  return new Chess(puzzle.fen);
}
