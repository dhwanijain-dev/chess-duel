"use client";

import { useEffect, useRef, useState } from "react";

interface DuelTimerProps {
  isRunning: boolean;
  /** Called every tick with current elapsed seconds */
  onTick?: (elapsed: number) => void;
  /** If provided, display this fixed time instead of running */
  frozenTime?: number;
}

export default function DuelTimer({
  isRunning,
  onTick,
  frozenTime,
}: DuelTimerProps) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

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
  }, [isRunning, frozenTime]);

  // Reset when frozenTime is explicitly set to 0
  useEffect(() => {
    if (frozenTime === 0) {
      setElapsed(0);
      startRef.current = null;
    }
  }, [frozenTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
  };

  return (
    <div className="duel-timer" id="duel-timer">
      <span className="duel-timer-text">{formatTime(elapsed)}</span>
    </div>
  );
}
