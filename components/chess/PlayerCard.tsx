"use client";

import type { PlayerData } from "@/lib/chess/game";

interface PlayerCardProps {
  player: PlayerData;
  side: "left" | "right";
}

export default function PlayerCard({ player, side }: PlayerCardProps) {
  const initials = player.name.slice(0, 2).toUpperCase();

  return (
    <div className={`player-card player-card-${side}`} id={`player-${side}`}>
      <div className="player-avatar">
        <span>{initials}</span>
      </div>
      <div className="player-info">
        <span className="player-name">{player.name}</span>
        <span className="player-rating">{player.rating}</span>
      </div>
      <div className="player-score-pill">
        <span>{player.score}</span>
      </div>
    </div>
  );
}
