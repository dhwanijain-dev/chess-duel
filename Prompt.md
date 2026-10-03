You are modifying/building a web application that demonstrates a new
"Chess Puzzle Duel" game mode inspired by the attached reference image.

IMPORTANT:
The attached image is the PRIMARY visual reference.

Do NOT simply build a generic chess website.

Replicate the visual language, spacing, proportions, hierarchy, dark
background, player header, timer, score indicators, centered game area,
green accent system, rounded controls, and minimal competitive-game feel
of the reference.

The reference currently shows a Matiks-style competitive math game.
We are adapting that exact interaction pattern into:

                CHESS PUZZLE DUEL

The concept:

Two players receive the same chess puzzle.
They independently solve the tactical position.
The faster correct solution wins the round.

This is a FRONTEND DEMO.
Do NOT implement real multiplayer yet.
Do NOT implement authentication.
Do NOT implement a backend.
Use hardcoded player data and hardcoded puzzle data.

==================================================
1. TECHNOLOGY
==================================================

Use the existing project's stack.

Preferred libraries:

- React / Next.js
- TypeScript
- Tailwind CSS if already installed
- chess.js
- react-chessboard
- lucide-react for icons
- framer-motion if animation is already available or can be safely added

Install if missing:

npm install chess.js react-chessboard lucide-react framer-motion

Do NOT introduce unnecessary libraries.

IMPORTANT:
Use `chess.js` for chess rules, FEN parsing, legal move validation,
check/checkmate detection, and move handling.

Use `react-chessboard` ONLY for rendering and interaction with the
chess board.

Do not implement chess movement logic manually.

Stockfish is NOT required for this first demo because the puzzle solutions
are hardcoded.

Architect the code so Stockfish could later be added as the server-side
puzzle validator.

==================================================
2. VISUAL REFERENCE
==================================================

The attached screenshot should be treated as the design reference.

Replicate these characteristics:

BACKGROUND:
- Very dark charcoal/near-black background.
- No gradients unless extremely subtle.
- Large amount of negative space.
- The game feels focused and competitive rather than like a traditional
  chess website.

TOP PLAYER AREA:
The reference has two players positioned on opposite sides.

Create:

LEFT:
- Small circular/square avatar
- Player name
- Rating below name
- Score pill underneath

CENTER:
- Small left/back navigation indicator
- Large rounded timer
- Bright cyan/blue timer text

RIGHT:
- Player name
- Rating
- Avatar
- Score pill

Example:

                    01:22

     Dhwani                              opponent
     1066                                  1090
     [4]                                   [0]

Preserve the asymmetric visual positioning from the reference.

PLAYER DATA:

Player 1:
name: "dhwa..."
rating: 1066
score: 4
avatar: use a simple placeholder/avatar

Player 2:
name: "nandi..."
rating: 1090
score: 0
avatar: use a simple generated/placeholder avatar

Do not make the player cards visually huge.

==================================================
3. CHESS GAME AREA
==================================================

Replace the mathematical puzzle grid from the reference with a
large centered chess board.

The board should occupy approximately the same visual region as the
math puzzle in the reference.

IMPORTANT:

The board should NOT look like Chess.com.

It should feel like it belongs inside the Matiks visual system.

Use:

- Dark/green board palette
- Rounded or slightly softened board container
- Minimal coordinate styling
- Clean modern chess pieces
- Green accent states
- Very subtle shadows
- No wood texture
- No excessive gradients

Recommended board colors:

background:
#191919 / #1a1a1a

primary green:
#00c96b / #00c878

dark green:
#155c3d / #174f37

cyan timer:
#00cfff

off-white:
#f1f1f1

The green used in the reference should become the main interaction
color of the chess application.

==================================================
4. CHESS PUZZLE INTERACTION
==================================================

At the start:

3
2
1
GO

Then start the timer.

Display:

"Find the best move"

above or near the board.

The user can drag pieces.

Use chess.js to determine whether the move is legal.

If the move is incorrect:

- briefly highlight the incorrect move
- do not immediately end the game
- allow another attempt
- optionally subtract a small amount from the score

If the move is correct:

- highlight the move
- stop the timer
- show a success state
- calculate the player's result
- transition to the result screen

For this demo, the opponent does NOT need to actually play.

Instead, simulate the opponent's completion time from the puzzle JSON.

Example:

You:
4.82 seconds

Opponent:
6.17 seconds

Then display:

YOU WIN

1.35s faster

==================================================
5. DUEL SCORING
==================================================

The basic demo scoring formula:

base points = puzzle.points

speed bonus = max(0, floor((timeLimit - playerTime) * 5))

final score =
base points + speed bonus

However, do not make the UI look mathematical.

The important visual result is:

YOU WIN

+137

4.82s
vs
6.17s

The exact formula can be changed later.

==================================================
6. BOTTOM CONTROLS
==================================================

The reference has undo / clear / redo controls below the puzzle.

Adapt this to chess.

Below the board:

[ ↶ ]       [ RESET ]       [ ↷ ]

Use subtle dark buttons.

The RESET button can be slightly larger.

Below that, instead of the numeric answer choices from the reference,
show chess-puzzle metadata:

        [ FORK ]   [ 1640 RATING ]

or:

        TACTICAL PUZZLE
        1640 RATED

Keep it visually compact.

==================================================
7. HARD CODED PUZZLE DATA
==================================================

Create:

/data/chessPuzzles.ts

Use this structure:

export const chessPuzzles = [
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
      uci: ["e1e8"]
    },

    opponent: {
      solveTime: 7.42
    },

    points: 100
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
      uci: ["d3d8"]
    },

    opponent: {
      solveTime: 8.14
    },

    points: 110
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
      uci: ["d5c7"]
    },

    opponent: {
      solveTime: 9.31
    },

    points: 125
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
      uci: ["d1d8"]
    },

    opponent: {
      solveTime: 11.24
    },

    points: 135
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
      uci: ["e1e8"]
    },

    opponent: {
      solveTime: 13.52
    },

    points: 150
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
      uci: ["d3d8"]
    },

    opponent: {
      solveTime: 15.12
    },

    points: 160
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
      uci: ["d3d8"]
    },

    opponent: {
      solveTime: 16.44
    },

    points: 175
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
      uci: ["d5c7"]
    },

    opponent: {
      solveTime: 18.31
    },

    points: 190
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
      uci: ["d5c7"]
    },

    opponent: {
      solveTime: 20.17
    },

    points: 210
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
      uci: ["d3d8"]
    },

    opponent: {
      solveTime: 24.82
    },

    points: 250
  }
];

==================================================
8. IMPORTANT PUZZLE IMPLEMENTATION DETAIL
==================================================

For the hardcoded demo, the `uci` solution is authoritative.

When a user makes a move:

const move = chess.move(...)

Compare the resulting move against:

puzzle.solution.uci[0]

Do not compare screenshots or piece positions manually.

For multi-move puzzles later, support:

solution.uci = [
  "move1",
  "move2",
  "move3"
]

and advance through the sequence.

IMPORTANT:
Keep the puzzle data isolated from the UI so the puzzle source can later
be replaced by a real database/API.

==================================================
9. GAME STATES
==================================================

Implement these states:

IDLE
  ↓
COUNTDOWN
  ↓
PLAYING
  ↓
CORRECT
  ↓
RESULT

Also support:

PLAYING
  ↓
TIMEOUT
  ↓
RESULT

Result screen should feel like the reference's competitive score
feedback rather than a generic modal.

Example:

             YOU WIN

              +137

          4.82 seconds

              VS

          6.17 seconds

       1.35s FASTER

       [ NEXT PUZZLE ]

==================================================
10. ANIMATION
==================================================

Use subtle animations.

Countdown:
scale/fade

Correct answer:
small green pulse

Incorrect move:
small shake

Timer:
smooth update

Result:
score count-up

Do NOT use excessive animation.

The reference is clean and restrained.

==================================================
11. RESPONSIVENESS
==================================================

Desktop:
- board approximately 520–600px
- player header across width
- large negative space

Tablet:
- board approximately 450px

Mobile:
- board should fit width with approximately 16px side margins
- player information should become more compact
- timer remains centered
- controls remain accessible

Do not allow horizontal scrolling.

==================================================
12. COMPONENT ARCHITECTURE
==================================================

Keep the implementation clean.

Suggested structure:

components/
    chess/
        ChessDuel.tsx
        ChessBoard.tsx
        DuelHeader.tsx
        DuelTimer.tsx
        PlayerCard.tsx
        DuelControls.tsx
        PuzzleMeta.tsx
        DuelResult.tsx
        Countdown.tsx

data/
    chessPuzzles.ts

lib/
    chess/
        game.ts
        scoring.ts

Do not put the entire application in one component.

==================================================
13. DESIGN RULE
==================================================

The most important thing:

This should look like:

"Matiks added a Chess Puzzle Duel"

NOT:

"Someone built another chess website."

Preserve the reference's:
- dark minimal interface
- green game elements
- compact player header
- centralized competitive timer
- generous negative space
- rounded controls
- small rating/score indicators
- restrained animations

But replace the mathematical game with a chess tactical puzzle.

Do NOT add:
- chat
- opening explorer
- chess clocks with traditional chess styling
- move history sidebar
- analysis engine panel
- full chess game UI
- traditional chess.com-style menus
- unnecessary settings
- giant "CHESS" branding

This is a FAST COMPETITIVE PUZZLE GAME.

==================================================
14. DEMO FLOW
==================================================

When the page loads:

1. Show player header.
2. Show "CHESS PUZZLE DUEL".
3. Show puzzle rating.
4. Countdown 3 → 2 → 1 → GO.
5. Start timer.
6. Display chess puzzle.
7. User makes moves.
8. Validate using chess.js.
9. If incorrect, allow another attempt.
10. If correct, stop timer.
11. Compare with hardcoded opponent.solveTime.
12. Show WIN/LOSS.
13. Show score gained.
14. Show "NEXT PUZZLE".
15. Load another hardcoded puzzle.

The demo should feel like a complete game loop even though there is
no actual second player.

==================================================
15. FINAL QUALITY BAR
==================================================

Before finishing:

- Make sure the chess board actually works.
- Make sure pieces can be moved.
- Make sure illegal moves are rejected.
- Make sure timer works.
- Make sure reset works.
- Make sure puzzle progression works.
- Make sure result state works.
- Make sure the UI closely follows the attached reference.
- Make sure there is no horizontal overflow.
- Make sure TypeScript has no unnecessary errors.
- Do not leave placeholder TODO UI elements.
- Do not replace the reference with a generic template.

Build the actual working prototype, not just a static mockup.
