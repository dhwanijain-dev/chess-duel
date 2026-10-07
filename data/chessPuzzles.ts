export interface ChessPuzzle {
  id: string;
  title: string;
  rating: number;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard" | "Expert";
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
  // ═══════════════════════════════════════════════════════════
  // EASY  (800 – 1000)
  // ═══════════════════════════════════════════════════════════
  {
    id: "puzzle_001",
    title: "Back Rank Finish",
    rating: 800,
    difficulty: "Easy",
    theme: "Mate in 1",
    timeLimit: 25,
    fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    solution: { san: ["Rd8#"], uci: ["d1d8"] },
    opponent: { solveTime: 4.2 },
    points: 80,
  },
  {
    id: "puzzle_002",
    title: "Knight Fork",
    rating: 900,
    difficulty: "Easy",
    theme: "Fork",
    timeLimit: 25,
    // Knight on d4 can jump to b5, forking a7-pawn & c7-pawn
    fen: "r3k2r/ppp2ppp/2n5/8/3N4/8/PPP2PPP/R3K2R w KQkq - 0 1",
    solution: { san: ["Nb5"], uci: ["d4b5"] },
    opponent: { solveTime: 5.1 },
    points: 85,
  },
  {
    id: "puzzle_003",
    title: "Free Queen",
    rating: 950,
    difficulty: "Easy",
    theme: "Hanging Piece",
    timeLimit: 25,
    // Rook on d1, undefended queen on d2 — capture it
    fen: "4k3/8/8/8/8/8/3q4/3R2K1 w - - 0 1",
    solution: { san: ["Rxd2"], uci: ["d1d2"] },
    opponent: { solveTime: 4.8 },
    points: 90,
  },
 
  // ═══════════════════════════════════════════════════════════
  // MEDIUM  (1200 – 1600)
  // ═══════════════════════════════════════════════════════════
  {
    id: "puzzle_005",
    title: "Pinned Knight",
    rating: 1200,
    difficulty: "Medium",
    theme: "Pin",
    timeLimit: 30,
    // Bishop on d4 slides to c5, pinning the knight to the king
    fen: "r3k2r/ppp2ppp/2n5/8/3B4/8/PPP2PPP/R3K2R w KQkq - 0 1",
    solution: { san: ["Bc5"], uci: ["d4c5"] },
    opponent: { solveTime: 6.8 },
    points: 110,
  },
  {
    id: "puzzle_006",
    title: "Discovered Check",
    rating: 1300,
    difficulty: "Medium",
    theme: "Discovered Attack",
    timeLimit: 30,
    // Bishop on d5 moves to c6+, discovering rook on d1's attack
    fen: "4k3/8/8/3B4/8/8/8/3RK3 w - - 0 1",
    solution: { san: ["Bc6+"], uci: ["d5c6"] },
    opponent: { solveTime: 7.4 },
    points: 120,
  },
  {
    id: "chess-001",
    title: "Back Rank",
    rating: 1450,
    difficulty: "Medium",
    theme: "Back Rank Mate",
    timeLimit: 30,
    fen: "6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1",
    solution: { san: ["Re8#"], uci: ["e1e8"] },
    opponent: { solveTime: 7.42 },
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
    solution: { san: ["Qd8#"], uci: ["d3d8"] },
    opponent: { solveTime: 8.14 },
    points: 110,
  },
  {
    id: "chess-003",
    title: "Royal Fork",
    rating: 1550,
    difficulty: "Medium",
    theme: "Fork",
    timeLimit: 35,
    fen: "r3k2r/8/8/3N4/8/8/8/6K1 w - - 0 1",
    solution: { san: ["Nc7+"], uci: ["d5c7"] },
    opponent: { solveTime: 9.31 },
    points: 125,
  },
  {
    id: "puzzle_007",
    title: "Knight Hop",
    rating: 1400,
    difficulty: "Medium",
    theme: "Double Attack",
    timeLimit: 30,
    // Knight on c5 jumps to d7, attacking the rook on b8 & king
    fen: "1r2k3/8/8/2N5/8/8/8/4K3 w - - 0 1",
    solution: { san: ["Nd7"], uci: ["c5d7"] },
    opponent: { solveTime: 8.0 },
    points: 115,
  },
  {
    id: "puzzle_008",
    title: "Bishop Strike",
    rating: 1500,
    difficulty: "Medium",
    theme: "Sacrifice",
    timeLimit: 30,
    // Bishop on c4 captures f7 pawn, giving check
    fen: "r3k2r/ppp2ppp/2n5/8/2B5/8/PPP2PPP/R3K2R w KQkq - 0 1",
    solution: { san: ["Bxf7+"], uci: ["c4f7"] },
    opponent: { solveTime: 8.6 },
    points: 120,
  },
  {
    id: "puzzle_009",
    title: "Back Rank Tactics",
    rating: 1600,
    difficulty: "Medium",
    theme: "Back Rank",
    timeLimit: 35,
    // Rook delivers back-rank mate; queen on f3 covers escape
    fen: "6k1/5ppp/8/8/8/5Q2/5PPP/3R2K1 w - - 0 1",
    solution: { san: ["Rd8#"], uci: ["d1d8"] },
    opponent: { solveTime: 10.0 },
    points: 130,
  },

  // ═══════════════════════════════════════════════════════════
  // HARD  (1600 – 2000)
  // ═══════════════════════════════════════════════════════════
  {
    id: "chess-004",
    title: "Back Rank Attack",
    rating: 1600,
    difficulty: "Hard",
    theme: "Back Rank",
    timeLimit: 35,
    fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1",
    solution: { san: ["Rd8#"], uci: ["d1d8"] },
    opponent: { solveTime: 11.24 },
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
    solution: { san: ["Re8#"], uci: ["e1e8"] },
    opponent: { solveTime: 13.52 },
    points: 150,
  },
  {
    id: "puzzle_010",
    title: "Queen Deflection",
    rating: 1700,
    difficulty: "Hard",
    theme: "Deflection",
    timeLimit: 35,
    // Queen captures the rook on e5, deflecting it from guarding
    fen: "6k1/ppp2ppp/8/4r3/3Q4/8/PPP2PPP/4R1K1 w - - 0 1",
    solution: { san: ["Qxe5"], uci: ["d4e5"] },
    opponent: { solveTime: 12.4 },
    points: 145,
  },
  {
    id: "puzzle_011",
    title: "The Zwischenzug",
    rating: 1800,
    difficulty: "Hard",
    theme: "Zwischenzug",
    timeLimit: 40,
    // Rook on d3 captures the queen on d5
    fen: "4k3/8/8/3q4/8/3R4/8/4K3 w - - 0 1",
    solution: { san: ["Rxd5"], uci: ["d3d5"] },
    opponent: { solveTime: 14.2 },
    points: 160,
  },
  {
    id: "chess-006",
    title: "Tactical Finish",
    rating: 1700,
    difficulty: "Hard",
    theme: "Mate",
    timeLimit: 40,
    fen: "6k1/5ppp/8/8/8/3Q4/5PPP/6K1 w - - 0 1",
    solution: { san: ["Qd8#"], uci: ["d3d8"] },
    opponent: { solveTime: 15.12 },
    points: 160,
  },
  {
    id: "puzzle_012",
    title: "Clear the File",
    rating: 1900,
    difficulty: "Hard",
    theme: "Clearance",
    timeLimit: 40,
    // Bishop on d4 moves to f6, clearing the d-file for the rook
    fen: "6k1/5ppp/8/8/3B4/8/5PPP/3R2K1 w - - 0 1",
    solution: { san: ["Bf6"], uci: ["d4f6"] },
    opponent: { solveTime: 15.8 },
    points: 170,
  },
  {
    id: "puzzle_013",
    title: "Smothered King",
    rating: 2000,
    difficulty: "Hard",
    theme: "Smothered Mate",
    timeLimit: 45,
    // Knight hops to h4, creating threats around the cornered king
    fen: "6rk/6pp/8/8/8/5N2/6PP/4R1K1 w - - 0 1",
    solution: { san: ["Nh4"], uci: ["f3h4"] },
    opponent: { solveTime: 16.5 },
    points: 180,
  },

  // ═══════════════════════════════════════════════════════════
  // VERY HARD  (2000 – 2400)
  // ═══════════════════════════════════════════════════════════
  {
    id: "chess-008",
    title: "Precision",
    rating: 1800,
    difficulty: "Very Hard",
    theme: "Tactical",
    timeLimit: 45,
    fen: "r3k2r/8/8/3N4/8/8/8/6K1 w - - 0 1",
    solution: { san: ["Nc7+"], uci: ["d5c7"] },
    opponent: { solveTime: 18.31 },
    points: 190,
  },
  {
    id: "puzzle_014",
    title: "Forced Mating Attack",
    rating: 2100,
    difficulty: "Very Hard",
    theme: "Mate Sequence",
    timeLimit: 45,
    // Classic Bxf7+ sacrifice to open up the king
    fen: "r1b1k2r/pppp1ppp/2n2n2/8/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w kq - 0 1",
    solution: { san: ["Bxf7+", "Kxf7", "Ng5+"], uci: ["c4f7"] },
    opponent: { solveTime: 19.5 },
    points: 200,
  },
  {
    id: "puzzle_015",
    title: "Queen Invasion",
    rating: 2200,
    difficulty: "Very Hard",
    theme: "Deflection Sacrifice",
    timeLimit: 45,
    // Queen crashes into d8 with check, exploiting the back rank
    fen: "r2q1rk1/ppp2ppp/2n5/3B4/8/2N5/PPP2PPP/R2Q1RK1 w - - 0 1",
    solution: { san: ["Qd4"], uci: ["d1d4"] },
    opponent: { solveTime: 20.8 },
    points: 210,
  },
  {
    id: "puzzle_016",
    title: "The Quiet Move",
    rating: 2300,
    difficulty: "Very Hard",
    theme: "Quiet Move",
    timeLimit: 50,
    // Queen moves to d8 with check, beginning the combination
    fen: "r4rk1/ppp2ppp/2n5/8/3Q4/2N5/PPP2PPP/R4RK1 w - - 0 1",
    solution: { san: ["Qd7"], uci: ["d4d7"] },
    opponent: { solveTime: 22.4 },
    points: 220,
  },
  {
    id: "puzzle_017",
    title: "Promote With Purpose",
    rating: 2400,
    difficulty: "Very Hard",
    theme: "Underpromotion",
    timeLimit: 50,
    // Pawn promotes to knight — queen would stalemate!
    fen: "8/P7/8/8/8/8/1k6/7K w - - 0 1",
    solution: { san: ["a8=N"], uci: ["a7a8n"] },
    opponent: { solveTime: 24.0 },
    points: 235,
  },

  // ═══════════════════════════════════════════════════════════
  // EXPERT  (2400 – 2800)
  // ═══════════════════════════════════════════════════════════
  {
    id: "puzzle_018",
    title: "No Good Moves",
    rating: 2500,
    difficulty: "Expert",
    theme: "Zugzwang",
    timeLimit: 50,
    // Kb1 forces zugzwang — black must give way
    fen: "8/8/8/8/8/2k5/1P6/K7 w - - 0 1",
    solution: { san: ["Kb1"], uci: ["a1b1"] },
    opponent: { solveTime: 26.0 },
    points: 245,
  },
  {
    id: "chess-009",
    title: "Calculation",
    rating: 1900,
    difficulty: "Expert",
    theme: "Fork",
    timeLimit: 50,
    fen: "r3k2r/8/8/3N4/8/8/8/6K1 w - - 0 1",
    solution: { san: ["Nc7+"], uci: ["d5c7"] },
    opponent: { solveTime: 20.17 },
    points: 210,
  },
  {
    id: "puzzle_019",
    title: "Brilliant Sacrifice",
    rating: 2600,
    difficulty: "Expert",
    theme: "Queen Sacrifice",
    timeLimit: 55,
    // Queen invades d8 with check, beginning a forcing sequence
    fen: "r3k2r/ppp2ppp/2n5/8/3Q4/2B5/PPP2PPP/R3K2R w KQkq - 0 1",
    solution: { san: ["Qd8+", "Nxd8", "Bf6"], uci: ["d4d8"] },
    opponent: { solveTime: 28.5 },
    points: 260,
  },
  {
    id: "puzzle_020",
    title: "Find the Only Move",
    rating: 2800,
    difficulty: "Expert",
    theme: "Deep Calculation",
    timeLimit: 60,
    // The classic Bxf7+ sacrifice followed by a deep combination
    fen: "r1b1k2r/pppp1ppp/2n2n2/8/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 w kq - 0 1",
    solution: {
      san: ["Bxf7+", "Kxf7", "Ng5+", "Kg8", "Qh5"],
      uci: ["c4f7"],
    },
    opponent: { solveTime: 35.0 },
    points: 300,
  },
  {
    id: "chess-010",
    title: "Final Challenge",
    rating: 2000,
    difficulty: "Expert",
    theme: "Tactical Finish",
    timeLimit: 60,
    fen: "6k1/5ppp/8/8/8/3Q4/5PPP/6K1 w - - 0 1",
    solution: { san: ["Qd8#"], uci: ["d3d8"] },
    opponent: { solveTime: 24.82 },
    points: 250,
  },
];
