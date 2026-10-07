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
import {
  ROUND_TIME_LIMIT,
  getBlitzDuelResult,
} from "@/lib/chess/scoring";
import DuelHeader from "./DuelHeader";
import ChessBoard from "./ChessBoard";
import DuelControls from "./DuelControls";
import PuzzleMeta from "./PuzzleMeta";
import Countdown from "./Countdown";
import DuelResult from "./DuelResult";

export default function ChessDuel() {
  // ── Puzzle state ──────────────────────────────────────────
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const puzzle = chessPuzzles[puzzleIndex % chessPuzzles.length];

  // ── Game engine ───────────────────────────────────────────
  const [game, setGame] = useState<Chess>(() => createGameFromPuzzle(puzzle));
  const [position, setPosition] = useState(puzzle.fen);

  // ── Game state machine ────────────────────────────────────
  const [gameState, setGameState] = useState<GameState>("IDLE");

  // ── Timer ─────────────────────────────────────────────────
  const [timerRunning, setTimerRunning] = useState(false);
  const [frozenTime, setFrozenTime] = useState<number | undefined>(0);
  const elapsedRef = useRef(0);

  // ── Blitz tracking ────────────────────────────────────────
  const [puzzlesSolved, setPuzzlesSolved] = useState(0);
  const solvedPuzzlesRef = useRef<typeof chessPuzzles>([]);
  const isAdvancingRef = useRef(false);

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
    score: 0,
  });

  const [player2, setPlayer2] = useState<PlayerData>({
    name: "nandi...",
    rating: 1090,
    score: 0,
  });

  // ── Board sizing ──────────────────────────────────────────
  const [boardWidth, setBoardWidth] = useState(520);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setBoardWidth(vw - 32);
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

  // ── Auto-start countdown on mount ─────────────────────────
  useEffect(() => {
    setGameState("COUNTDOWN");
  }, []);

  // ── Timer tick handler ────────────────────────────────────
  const handleTick = useCallback((elapsed: number) => {
    elapsedRef.current = elapsed;
  }, []);

  // ── Timeout detection (1 minute is up) ────────────────────
  useEffect(() => {
    if (!timerRunning) return;

    const checkTimeout = setInterval(() => {
      if (elapsedRef.current >= ROUND_TIME_LIMIT) {
        setTimerRunning(false);
        setFrozenTime(ROUND_TIME_LIMIT);
        setGameState("TIMEOUT");

        const opponentSolved = 0;

        // Build result
        const result = getBlitzDuelResult(
          solvedPuzzlesRef.current.length,
          opponentSolved,
          solvedPuzzlesRef.current,
        );
        setDuelResult(result);

        setTimeout(() => setGameState("RESULT"), 800);
      }
    }, 100);

    return () => clearInterval(checkTimeout);
  }, [timerRunning]);

  // ── Countdown complete ────────────────────────────────────
  const handleCountdownComplete = useCallback(() => {
    setGameState("PLAYING");
    setFrozenTime(undefined);
    elapsedRef.current = 0;
    setTimerRunning(true);
  }, []);

  // ── Advance to next puzzle (blitz mode) ───────────────────
  const advanceToNextPuzzle = useCallback(() => {
    const nextIndex = (puzzleIndex + 1) % chessPuzzles.length;
    const nextPuzzle = chessPuzzles[nextIndex];
    const fresh = createGameFromPuzzle(nextPuzzle);

    setPuzzleIndex(nextIndex);
    setGame(fresh);
    setPosition(nextPuzzle.fen);
    setMoveHistory([]);
    setUndoStack([]);
    setMoveStatus("idle");
    isAdvancingRef.current = false;
  }, [puzzleIndex]);

  // ── Piece drop handler ────────────────────────────────────
  const handlePieceDrop = useCallback(
    (source: string, target: string): boolean => {
      if (gameState !== "PLAYING" || isAdvancingRef.current) return false;

      const gameCopy = new Chess(game.fen());

      try {
        const move = gameCopy.move({
          from: source,
          to: target,
          promotion: "q",
        });

        if (!move) return false;

        // Check if this move is the solution
        if (isSolutionMove(puzzle, move)) {
          // Correct move — flash green, increment count, auto-advance
          isAdvancingRef.current = true;
          setGame(gameCopy);
          setPosition(gameCopy.fen());
          setMoveStatus("correct");

          // Track solved puzzle
          const newCount = puzzlesSolved + 1;
          setPuzzlesSolved(newCount);
          solvedPuzzlesRef.current = [...solvedPuzzlesRef.current, puzzle];

          // Update player score display
          setPlayer1((prev) => ({ ...prev, score: newCount }));

          // Brief green flash then auto-advance (timer keeps running!)
          setTimeout(() => {
            advanceToNextPuzzle();
          }, 500);

          return true;
        } else {
          // Incorrect but legal move
          setGame(gameCopy);
          setPosition(gameCopy.fen());
          setMoveHistory((prev) => [...prev, gameCopy.fen()]);
          setUndoStack([]);
          setMoveStatus("incorrect");

          setTimeout(() => setMoveStatus("idle"), 600);
          return true;
        }
      } catch {
        return false;
      }
    },
    [game, gameState, puzzle, puzzlesSolved, advanceToNextPuzzle],
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

  // ── Reset current puzzle ──────────────────────────────────
  const handleReset = useCallback(() => {
    if (gameState !== "PLAYING") return;

    const fresh = createGameFromPuzzle(puzzle);
    setGame(fresh);
    setPosition(puzzle.fen);
    setMoveHistory([]);
    setUndoStack([]);
    setMoveStatus("idle");
  }, [gameState, puzzle]);

  // ── Play again (restart full round) ───────────────────────
  const handlePlayAgain = useCallback(() => {
    setPuzzleIndex(0);

    const firstPuzzle = chessPuzzles[0];
    const fresh = createGameFromPuzzle(firstPuzzle);
    setGame(fresh);
    setPosition(firstPuzzle.fen);
    setMoveHistory([]);
    setUndoStack([]);
    setMoveStatus("idle");
    setDuelResult(null);
    setPuzzlesSolved(0);
    solvedPuzzlesRef.current = [];
    isAdvancingRef.current = false;
    setTimerRunning(false);
    setFrozenTime(0);
    elapsedRef.current = 0;
    setPlayer1((prev) => ({ ...prev, score: 0 }));
    setPlayer2((prev) => ({ ...prev, score: 0 }));
    setGameState("COUNTDOWN");
  }, []);

  // ── Render ────────────────────────────────────────────────
  const isPlaying = gameState === "PLAYING";
  const showBoard = gameState !== "IDLE" && gameState !== "RESULT";

  return (
    <div className="chess-duel" ref={containerRef} id="chess-duel">
      {/* Header with players and countdown timer */}
      <DuelHeader
        player1={player1}
        player2={player2}
        timerRunning={timerRunning}
        frozenTime={frozenTime}
        onTick={handleTick}
        countdownFrom={ROUND_TIME_LIMIT}
      />

      {/* Puzzle prompt + solved counter */}
      {isPlaying && (
        <div className="puzzle-prompt-area" id="puzzle-prompt">
          <div className="puzzle-prompt">Find the best move</div>
          <div className="puzzle-solved-counter">
            Solved: <span className="puzzle-solved-count">{puzzlesSolved}</span>
          </div>
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
        <DuelResult result={duelResult} onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
}
