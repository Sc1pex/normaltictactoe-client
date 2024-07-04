const BOARD_SIZE = 4;

export class Board {
  cells: Cell[];

  constructor(cells: Cell[] = Array(BOARD_SIZE * BOARD_SIZE).fill("empty")) {
    this.cells = cells;
  }

  move(index: number, player: Cell): Board {
    const newCells = this.cells.slice();
    newCells[index] = player;
    return new Board(newCells);
  }

  emptyCells() {
    return this.cells.reduce(
      (acc, cell) => acc + (cell === "empty" ? 1 : 0),
      0,
    );
  }

  checkWin(): Player | null {
    const check = (idxes: number[]) => {
      const cells = idxes.map((i) => this.cells[i]);
      if (cells[0] === "empty") {
        return null;
      }
      if (cells.every((cell) => cell === cells[0])) {
        return cells[0];
      }
      return null;
    };

    const idxes = Array.from({ length: BOARD_SIZE }).map((_, i) => i);
    let winner = this.#checkDiags(check);

    for (const i of idxes) {
      winner = winner || this.#checkLine(i, check) || this.#checkCol(i, check);
    }
    return winner;
  }

  checkAlmostWin(p: Player): { p: Player; c: number } | null {
    const check = (idxes: number[]): { p: Player; c: number } | null => {
      let counts = [0, 0, 0];
      let empty = -1;

      for (const i of idxes) {
        if (this.cells[i] === "empty") {
          empty = i;
          counts[0]++;
        } else if (this.cells[i] === "x") {
          counts[1]++;
        } else {
          counts[2]++;
        }
      }

      if (counts[0] !== 1) {
        return null;
      }
      if (counts[1] === 3 && p === "x") {
        return { p: "x", c: empty };
      }
      if (counts[2] === 3 && p === "o") {
        return { p: "o", c: empty };
      }
      return null;
    };

    const idxes = Array.from({ length: BOARD_SIZE }).map((_, i) => i);
    let almostWin = this.#checkDiags(check);

    for (const i of idxes) {
      almostWin =
        almostWin || this.#checkLine(i, check) || this.#checkCol(i, check);
    }
    return almostWin;
  }

  #checkLine<T>(l: number, f: (_: number[]) => T): T {
    const line = Array.from({ length: BOARD_SIZE }).map((_, i) => {
      return l * BOARD_SIZE + i;
    });
    return f(line);
  }

  #checkCol<T>(c: number, f: (_: number[]) => T): T {
    const cols = Array.from({ length: BOARD_SIZE }).map((_, i) => {
      return c + i * BOARD_SIZE;
    });
    return f(cols);
  }

  #checkDiags<T>(f: (_: number[]) => T): T {
    const diag1 = Array.from({ length: BOARD_SIZE }).map(
      (_, i) => i * BOARD_SIZE + i,
    );
    const diag2 = Array.from({ length: BOARD_SIZE }).map(
      (_, i) => i * BOARD_SIZE + (BOARD_SIZE - i - 1),
    );
    return f(diag1) || f(diag2);
  }
}
