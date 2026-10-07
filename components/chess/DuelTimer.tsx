"use client";

import { ChevronLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DuelTimerProps {
  isRunning: boolean;
  /** Called every tick with current elapsed seconds */
  onTick?: (elapsed: number) => void;
  /** If provided, display this fixed time instead of running */
  frozenTime?: number;
  /** If set, display as a countdown from this value (shows remaining time) */
  countdownFrom?: number;
  player1?: number;

}

export default function DuelTimer({
  isRunning,
  onTick,
  frozenTime,
  countdownFrom,
  player1,
}: DuelTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  
  const[showScore,setShowScore] = useState(false);
  useEffect(() => {
    if (frozenTime !== undefined) {
      setElapsed(frozenTime);
      return;
    }
    
    
    if (!isRunning) {
      startRef.current = null;
      return;
    }

    // Capture the current elapsed to continue from it
    const baseElapsed = elapsed;

    const tick = (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp;
      }
      if(player1 !== undefined && player1 > 0){
        setShowScore(true);
      }
      const newElapsed =
        baseElapsed + (timestamp - startRef.current) / 1000;
      setElapsed(newElapsed);
      onTick?.(newElapsed);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, frozenTime,player1,onTick]);

  // Reset when frozenTime is explicitly set to 0
  useEffect(() => {
    if (frozenTime === 0) {
      setElapsed(0);
      startRef.current = null;
    }
  }, [frozenTime]);

  const displaySeconds = countdownFrom !== undefined
    ? Math.max(0, countdownFrom - elapsed)
    : elapsed;

  const isUrgent = countdownFrom !== undefined && displaySeconds <= 10;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  };

  return (
    <div className="duel-timer-container" id="duel-timer-container">
     {showScore && <ChevronLeft color="green"/>}
    <div
      className={`duel-timer ${isUrgent ? "duel-timer-urgent" : ""}`}
      id="duel-timer"
    >
      <span className="duel-timer-text">{formatTime(displaySeconds)}</span>
    </div>
    </div>

  );
}
