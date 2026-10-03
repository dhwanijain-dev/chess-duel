"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Chess } from "chess.js";
import { chessPuzzles } from "@/data/chessPuzzles";
import {
  type GameState,
  type PlayerData,
  type DuelResultData,
  createGameFromPuzzle,
  isSolutionMove,
} from "@/lib/chess/game";
import { getDuelResult } from "@/lib/chess/scoring";
import DuelHeader from "./DuelHeader";
import ChessBoard from "./ChessBoard";
import DuelControls from "./DuelControls";
import PuzzleMeta from "./PuzzleMeta";
import Countdown from "./Countdown";
import DuelResult from "./DuelResult";

export default function ChessDuel() {
  // ── Puzzle state ──────────────────────────────────────────
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const puzzle = chessPuzzles[puzzleIndex];

  // ── Game engine ───────────────────────────────────────────
  const [game, setGame] = useState<Chess>(() => createGameFromPuzzle(puzzle));
  const [position, setPosition] = useState(puzzle.fen);

  // ── Game state machine ────────────────────────────────────
  const [gameState, setGameState] = useState<GameState>("IDLE");

  // ── Timer ─────────────────────────────────────────────────
  const [timerRunning, setTimerRunning] = useState(false);
  const [frozenTime, setFrozenTime] = useState<number | undefined>(0);
  const elapsedRef = useRef(0);

  // ── Move feedback ─────────────────────────────────────────
  const [moveStatus, setMoveStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");

  // ── Move history for undo/redo ────────────────────────────
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [undoStack, setUndoStack] = useState<string[]>([]);

  // ── Duel result ───────────────────────────────────────────
  const [duelResult, setDuelResult] = useState<DuelResultData | null>(null);

  // ── Player data ───────────────────────────────────────────
  const [player1, setPlayer1] = useState<PlayerData>({
    name: "dhwa...",
    rating: 1066,
    score: 4,
  });

  const player2: PlayerData = {
    name: "nandi...",
    rating: 1090,
    score: 0,
  };

  // ── Board sizing ──────────────────────────────────────────
  const [boardWidth, setBoardWidth] = useState(520);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setBoardWidth(vw - 32); // 16px margins each side
      } else if (vw < 640) {
        setBoardWidth(Math.min(vw - 32, 420));
      } else if (vw < 768) {
        setBoardWidth(450);
      } else {
        setBoardWidth(Math.min(560, vw - 80));
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ── Auto-start countdown on mount / new puzzle ────────────
  useEffect(() => {
    setGameState("COUNTDOWN");
  }, [puzzleIndex]);

  // ── Timer tick handler ────────────────────────────────────
  const handleTick = useCallback((elapsed: number) => {
    elapsedRef.current = elapsed;
  }, []);

  // ── Timeout detection ─────────────────────────────────────
  useEffect(() => {
    if (!timerRunning) return;

    const checkTimeout = setInterval(() => {
      if (elapsedRef.current >= puzzle.timeLimit) {
        setTimerRunning(false);
        setFrozenTime(puzzle.timeLimit);
        setGameState("TIMEOUT");

        // Compute result with max time
        const result = getDuelResult(
          puzzle.timeLimit,
          puzzle.opponent.solveTime,
          puzzle.points,
          puzzle.timeLimit,
        );
        setDuelResult(result);

        setTimeout(() => setGameState("RESULT"), 1000);
      }
    }, 100);

    return () => clearInterval(checkTimeout);
  }, [timerRunning, puzzle]);

  // ── Countdown complete ────────────────────────────────────
  const handleCountdownComplete = useCallback(() => {
    setGameState("PLAYING");
    setFrozenTime(undefined);
    elapsedRef.current = 0;
    setTimerRunning(true);
  }, []);

  // ── Piece drop handler ────────────────────────────────────
  const handlePieceDrop = useCallback(
    (source: string, target: string): boolean => {
      if (gameState !== "PLAYING") return false;

      const gameCopy = new Chess(game.fen());

      try {
        const move = gameCopy.move({
          from: source,
          to: target,
          promotion: "q", // Always promote to queen for simplicity
        });

        if (!move) return false;

        // Check if this move is the solution
        if (isSolutionMove(puzzle, move)) {
          // Correct move!
          setGame(gameCopy);
          setPosition(gameCopy.fen());
          setMoveStatus("correct");
          setTimerRunning(false);
          setFrozenTime(elapsedRef.current);
          setGameState("CORRECT");

          const result = getDuelResult(
            elapsedRef.current,
            puzzle.opponent.solveTime,
            puzzle.points,
            puzzle.timeLimit,
          );
          setDuelResult(result);

          // Update player score
          setPlayer1((prev) => ({
            ...prev,
            score: prev.score + (result.won ? 1 : 0),
          }));

          setTimeout(() => setGameState("RESULT"), 1200);
          return true;
        } else {
          // Incorrect but legal move
          setGame(gameCopy);
          setPosition(gameCopy.fen());
          setMoveHistory((prev) => [...prev, gameCopy.fen()]);
          setUndoStack([]);
          setMoveStatus("incorrect");

          // Reset feedback after animation
          setTimeout(() => setMoveStatus("idle"), 600);
          return true;
        }
      } catch {
        // Illegal move
        return false;
      }
    },
    [game, gameState, puzzle],
  );

  // ── Undo ──────────────────────────────────────────────────
  const handleUndo = useCallback(() => {
    if (gameState !== "PLAYING") return;

    const gameCopy = new Chess(game.fen());
    const move = gameCopy.undo();
    if (!move) return;

    setUndoStack((prev) => [...prev, game.fen()]);
    setGame(gameCopy);
    setPosition(gameCopy.fen());
    setMoveHistory((prev) => prev.slice(0, -1));
  }, [game, gameState]);

  // ── Redo ──────────────────────────────────────────────────
  const handleRedo = useCallback(() => {
    if (gameState !== "PLAYING" || undoStack.length === 0) return;

    const redoFen = undoStack[undoStack.length - 1];
    const gameCopy = new Chess(redoFen);

    setUndoStack((prev) => prev.slice(0, -1));
    setGame(gameCopy);
    setPosition(gameCopy.fen());
    setMoveHistory((prev) => [...prev, redoFen]);
  }, [gameState, undoStack]);

  // ── Reset ─────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    if (gameState !== "PLAYING") return;

    const fresh = createGameFromPuzzle(puzzle);
    setGame(fresh);
    setPosition(puzzle.fen);
    setMoveHistory([]);
    setUndoStack([]);
    setMoveStatus("idle");
  }, [gameState, puzzle]);

  // ── Next puzzle ───────────────────────────────────────────
  const handleNextPuzzle = useCallback(() => {
    const nextIndex = (puzzleIndex + 1) % chessPuzzles.length;
    setPuzzleIndex(nextIndex);

    const nextPuzzle = chessPuzzles[nextIndex];
    const fresh = createGameFromPuzzle(nextPuzzle);
    setGame(fresh);
    setPosition(nextPuzzle.fen);
    setMoveHistory([]);
    setUndoStack([]);
    setMoveStatus("idle");
    setDuelResult(null);
    setTimerRunning(false);
    setFrozenTime(0);
    elapsedRef.current = 0;
    // gameState will be set to COUNTDOWN by the useEffect on puzzleIndex
  }, [puzzleIndex]);

  // ── Render ────────────────────────────────────────────────
  const isPlaying = gameState === "PLAYING";
  const showBoard =
    gameState !== "IDLE" && gameState !== "RESULT";

  return (
    <div className="chess-duel" ref={containerRef} id="chess-duel">
      {/* Header with players and timer */}
      <DuelHeader
        player1={player1}
        player2={player2}
        timerRunning={timerRunning}
        frozenTime={frozenTime}
        onTick={handleTick}
      />

      {/* Puzzle prompt */}
      {isPlaying && (
        <div className="puzzle-prompt" id="puzzle-prompt">
          Find the best move
        </div>
      )}

      {/* Countdown overlay */}
      {gameState === "COUNTDOWN" && (
        <Countdown onComplete={handleCountdownComplete} />
      )}

      {/* Chess Board */}
      {showBoard && (
        <>
          <ChessBoard
            position={position}
            onPieceDrop={handlePieceDrop}
            boardWidth={boardWidth}
            disabled={!isPlaying}
            moveStatus={moveStatus}
          />

          {/* Controls below board */}
          <DuelControls
            onUndo={handleUndo}
            onReset={handleReset}
            onRedo={handleRedo}
            canUndo={moveHistory.length > 0}
            canRedo={undoStack.length > 0}
            disabled={!isPlaying}
          />

          {/* Puzzle metadata */}
          <PuzzleMeta
            theme={puzzle.theme}
            rating={puzzle.rating}
            difficulty={puzzle.difficulty}
          />
        </>
      )}

      {/* Result overlay */}
      {gameState === "RESULT" && duelResult && (
        <DuelResult result={duelResult} onNextPuzzle={handleNextPuzzle} />
      )}
    </div>
  );
}
