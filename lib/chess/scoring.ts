import type { ChessPuzzle } from "@/data/chessPuzzles";
import type { DuelResultData } from "./game";

/** Total round duration in seconds */
export const ROUND_TIME_LIMIT = 60;

/**
 * Calculate total points earned from solving multiple puzzles.
 */
export function calculateTotalPoints(
  solvedPuzzles: ChessPuzzle[],
): number {
  return solvedPuzzles.reduce((sum, p) => sum + p.points, 0);
}

/**
 * Simulate how many puzzles the opponent solves within the time limit
 * by summing their individual solve times until they exceed the limit.
 */
export function simulateOpponentSolved(
  puzzles: ChessPuzzle[],
  timeLimit: number = ROUND_TIME_LIMIT,
): number {
  let cumulative = 0;
  let solved = 0;
  for (const puzzle of puzzles) {
    cumulative += puzzle.opponent.solveTime;
    if (cumulative > timeLimit) break;
    solved++;
  }
  return solved;
}

/**
 * Determine the blitz duel result by comparing puzzles solved.
 */
export function getBlitzDuelResult(
  playerSolved: number,
  opponentSolved: number,
  solvedPuzzles: ChessPuzzle[],
): DuelResultData {
  const won = playerSolved > opponentSolved;
  const difference = Math.abs(playerSolved - opponentSolved);
  const totalPoints = calculateTotalPoints(solvedPuzzles);

  return {
    playerSolved,
    opponentSolved,
    won,
    difference,
    totalPoints,
  };
}
