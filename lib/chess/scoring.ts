import type { DuelResultData } from "./game";

/**
 * Calculate the score for a puzzle solve.
 *
 * Formula:
 *   base points + speed bonus
 *   speed bonus = max(0, floor((timeLimit - playerTime) * 5))
 */
export function calculateScore(
  basePoints: number,
  timeLimit: number,
  playerTime: number,
): number {
  const speedBonus = Math.max(0, Math.floor((timeLimit - playerTime) * 5));
  return basePoints + speedBonus;
}

/**
 * Determine the duel result by comparing player and opponent times.
 */
export function getDuelResult(
  playerTime: number,
  opponentTime: number,
  basePoints: number,
  timeLimit: number,
): DuelResultData {
  const won = playerTime <= opponentTime;
  const timeDifference = Math.abs(playerTime - opponentTime);
  const scoreGained = calculateScore(basePoints, timeLimit, playerTime);

  return {
    playerTime,
    opponentTime,
    won,
    timeDifference,
    scoreGained,
  };
}
