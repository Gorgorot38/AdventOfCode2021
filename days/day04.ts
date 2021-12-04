export class Day04 {
  drawnNumbers: string[] = [];
  boards: Bingo[][][] = [];
  constructor(input: string[]) {
    this.drawnNumbers = input[0].split(',').filter((v) => v);

    const grids = input.filter((v) => v && v.length < 30);
    grids.forEach((v, idx) => {
      if (idx % 5 === 0) {
        const currentBingo: Bingo[][] = [];
        for (let tmpIdx = 0; tmpIdx < 5; tmpIdx++) {
          currentBingo.push(
            grids[idx + tmpIdx]
              .split(' ')
              .filter((c) => c)
              .map((c) => new Bingo(c, false))
          );
        }
        this.boards.push(currentBingo);
      }
    });
  }

  public part1(): string {
    let winningNum = '';
    for (let num of this.drawnNumbers) {
      this.boards.forEach((board) =>
        board.forEach((line) =>
          line.forEach((v) => {
            if (v.num === num) {
              v.marked = v.num === num;
            }
          })
        )
      );

      if (this.boards.some((b) => this.isCompleted(b))) {
        winningNum = num;
        break;
      }
    }

    const winningBoard = this.boards.find((b) => this.isCompleted(b)) as Bingo[][];

    return (
      parseInt(winningNum) *
      winningBoard
        .flat()
        .filter((v) => !v.marked)
        .reduce((a, b) => a + parseInt(b.num), 0)
    ).toString();
  }

  public part2(): string {
    let winningNum = '';
    for (let num of this.drawnNumbers) {
      this.boards.forEach((board) =>
        board.forEach((line) =>
          line.forEach((v) => {
            if (v.num === num) {
              v.marked = v.num === num;
            }
          })
        )
      );

      if (this.boards.length === 1 && this.boards.some((b) => this.isCompleted(b))) {
        winningNum = num;
        break;
      }
      this.boards = this.boards.filter((b) => !this.isCompleted(b));
    }

    const winningBoard = this.boards.find((b) => this.isCompleted(b)) as Bingo[][];

    return (
      parseInt(winningNum) *
      winningBoard
        .flat()
        .filter((v) => !v.marked)
        .reduce((a, b) => a + parseInt(b.num), 0)
    ).toString();
  }

  private isCompleted(board: Bingo[][]): boolean {
    let column = false;
    for (let x = 0; x < board.length; x++) {
      column = board.every((b) => b[x].marked);
      if (column) {
        break;
      }
    }
    const line = board.some((b) => b.every((n) => n.marked));

    return column || line;
  }
}

export class Bingo {
  num: string;
  marked: boolean;
  constructor(num: string, marked: boolean) {
    this.num = num;
    this.marked = marked;
  }
}
