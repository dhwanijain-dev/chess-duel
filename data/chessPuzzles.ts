export interface ChessPuzzle {
  id: string;
  title: string;
  rating: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  theme: string;
  timeLimit: number;
  fen: string;
  solution: {
    san: string[];
    uci: string[];
  };
  opponent: {
    solveTime: number;
  };
  points: number;
}

export const chessPuzzles: ChessPuzzle[] = [
  {
    id: "chess-001",
    title: "Back Rank",
    rating: 1450,
    difficulty: "Medium",
    theme: "Back Rank Mate",
    timeLimit: 30,
    fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
    solution: {
      san: ["Re8#"],
      uci: ["e1e8"],
    },
    opponent: {
      solveTime: 7.42,
    },
    points: 100,
  },
  {
    id: "chess-002",
    title: "Queen Finish",
    rating: 1500,
    difficulty: "Medium",
    theme: "Checkmate",
    timeLimit: 30,
    fen: "6k1/5ppp/8/8/8/3Q4/5PPP/6K1 w - - 0 1",
    solution: {
      san: ["Qd8#"],
      uci: ["d3d8"],
    },
    opponent: {
      solveTime: 8.14,
    },
    points: 110,
  },
  {
    id: "chess-003",
    title: "Knight Fork",
    rating: 1550,
    difficulty: "Medium",
    theme: "Fork",
    timeLimit: 35,
    fen: "r3k2r/8/8/3N4/8/8/8/6K1 w - - 0 1",
    solution: {
      san: ["Nc7+"],
      uci: ["d5c7"],
    },
    opponent: {
      solveTime: 9.31,
    },
    points: 125,
  },
  {
    id: "chess-004",
    title: "Back Rank Attack",
    rating: 1600,
    difficulty: "Hard",
    theme: "Back Rank",
    timeLimit: 35,
    fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    solution: {
      san: ["Rd8#"],
      uci: ["d1d8"],
    },
    opponent: {
      solveTime: 11.24,
    },
    points: 135,
  },
  {
    id: "chess-005",
    title: "Rook Mate",
    rating: 1650,
    difficulty: "Hard",
    theme: "Checkmate",
    timeLimit: 40,
    fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
    solution: {
      san: ["Re8#"],
      uci: ["e1e8"],
    },
    opponent: {
      solveTime: 13.52,
    },
    points: 150,
  },
  {
    id: "chess-006",
    title: "Tactical Finish",
    rating: 1700,
    difficulty: "Hard",
    theme: "Mate",
    timeLimit: 40,
    fen: "6k1/5ppp/8/8/8/3Q4/5PPP/6K1 w - - 0 1",
    solution: {
      san: ["Qd8#"],
      uci: ["d3d8"],
    },
    opponent: {
      solveTime: 15.12,
    },
    points: 160,
  },
  {
    id: "chess-007",
    title: "Fast Finish",
    rating: 1750,
    difficulty: "Hard",
    theme: "Checkmate",
    timeLimit: 45,
    fen: "6k1/5ppp/8/8/8/3Q4/5PPP/6K1 w - - 0 1",
    solution: {
      san: ["Qd8#"],
      uci: ["d3d8"],
    },
    opponent: {
      solveTime: 16.44,
    },
    points: 175,
  },
  {
    id: "chess-008",
    title: "Precision",
    rating: 1800,
    difficulty: "Expert",
    theme: "Tactical",
    timeLimit: 45,
    fen: "r3k2r/8/8/3N4/8/8/8/6K1 w - - 0 1",
    solution: {
      san: ["Nc7+"],
      uci: ["d5c7"],
    },
    opponent: {
      solveTime: 18.31,
    },
    points: 190,
  },
  {
    id: "chess-009",
    title: "Calculation",
    rating: 1900,
    difficulty: "Expert",
    theme: "Fork",
    timeLimit: 50,
    fen: "r3k2r/8/8/3N4/8/8/8/6K1 w - - 0 1",
    solution: {
      san: ["Nc7+"],
      uci: ["d5c7"],
    },
    opponent: {
      solveTime: 20.17,
    },
    points: 210,
  },
  {
    id: "chess-010",
    title: "Final Challenge",
    rating: 2000,
    difficulty: "Expert",
    theme: "Tactical Finish",
    timeLimit: 60,
    fen: "6k1/5ppp/8/8/8/3Q4/5PPP/6K1 w - - 0 1",
    solution: {
      san: ["Qd8#"],
      uci: ["d3d8"],
    },
    opponent: {
      solveTime: 24.82,
    },
    points: 250,
  },
];
