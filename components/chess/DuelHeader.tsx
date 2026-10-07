"use client";

import type { PlayerData } from "@/lib/chess/game";
import PlayerCard from "./PlayerCard";
import DuelTimer from "./DuelTimer";

interface DuelHeaderProps {
  player1: PlayerData;
  player2: PlayerData;
  timerRunning: boolean;
  frozenTime?: number;
  onTick?: (elapsed: number) => void;
  countdownFrom?: number;
}

export default function DuelHeader({
  player1,
  player2,
  timerRunning,
  frozenTime,
  onTick,
  countdownFrom,
}: DuelHeaderProps) {
  return (
    <div className="duel-header" id="duel-header">
      <PlayerCard player={player1} side="left" />
      <DuelTimer
        isRunning={timerRunning}
        frozenTime={frozenTime}
        onTick={onTick}
        countdownFrom={countdownFrom}
        player1={player1.score}
      />
      
      <PlayerCard player={player2} side="right" />
    </div>
  );
}
