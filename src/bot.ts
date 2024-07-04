import { Board } from "./board";

const BLOCK_WIN = 0.45;

export function botMove(b: Board, bot: Player): number {
  const emptyCells = b.cells
    .map((cell, i) => {
      return { cell, i };
    })
    .filter(({ cell }) => cell === "empty");

  const almostWinBot = b.checkAlmostWin(bot);
  if (almostWinBot) {
    console.log("WE WIN 🗣️🗣️");
    return almostWinBot.c;
  }

  const almostWinPlayer = b.checkAlmostWin(bot === "x" ? "o" : "x");
  if (almostWinPlayer) {
    const r = Math.random();
    if (r < BLOCK_WIN) {
      console.log("BLOCKING 🛑🛑");
      return almostWinPlayer.c;
    } else {
      console.log("NOT BLOCKING 🚫🚫");
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex].i;
}
