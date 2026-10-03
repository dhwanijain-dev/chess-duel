"use client";

interface PuzzleMetaProps {
  theme: string;
  rating: number;
  difficulty: string;
}

export default function PuzzleMeta({
  theme,
  rating,
  difficulty,
}: PuzzleMetaProps) {
  return (
    <div className="puzzle-meta" id="puzzle-meta">
      <span className="puzzle-meta-tag">{theme}</span>
      <span className="puzzle-meta-divider">•</span>
      <span className="puzzle-meta-tag">{rating} Rated</span>
      <span className="puzzle-meta-divider">•</span>
      <span className="puzzle-meta-difficulty">{difficulty}</span>
    </div>
  );
}
