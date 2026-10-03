"use client";

import { Undo2, RotateCcw, Redo2 } from "lucide-react";

interface DuelControlsProps {
  onUndo: () => void;
  onReset: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  disabled: boolean;
}

export default function DuelControls({
  onUndo,
  onReset,
  onRedo,
  canUndo,
  canRedo,
  disabled,
}: DuelControlsProps) {
  return (
    <div className="duel-controls" id="duel-controls">
      <button
        className="duel-control-btn"
        onClick={onUndo}
        disabled={disabled || !canUndo}
        aria-label="Undo move"
        id="btn-undo"
      >
        <Undo2 size={18} />
      </button>
      <button
        className="duel-control-btn duel-control-reset"
        onClick={onReset}
        disabled={disabled}
        aria-label="Reset puzzle"
        id="btn-reset"
      >
        <RotateCcw size={18} />
        <span>Reset</span>
      </button>
      <button
        className="duel-control-btn"
        onClick={onRedo}
        disabled={disabled || !canRedo}
        aria-label="Redo move"
        id="btn-redo"
      >
        <Redo2 size={18} />
      </button>
    </div>
  );
}
