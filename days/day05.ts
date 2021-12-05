export class Day05 {
  input_data: Coordinates[];
  constructor(input: string[]) {
    this.input_data = input
      .map((v) =>
        v
          .replace(' -> ', ',')
          .split(',')
          .map((v) => parseInt(v))
      )
      .map((v) => new Coordinates(v[0], v[1], v[2], v[3]));
  }

  public part1(): string {
    const grid: number[][] = this.initGrid();
    this.input_data
      .filter((v) => v.startingX === v.endingX || v.startingY === v.endingY)
      .forEach((coord) => {
        if (coord.startingX === coord.endingX) {
          if (coord.startingY < coord.endingY) {
            for (let idx = coord.startingY; idx <= coord.endingY; idx++) {
              grid[coord.startingX][idx]++;
            }
          } else {
            for (let idx = coord.startingY; idx >= coord.endingY; idx--) {
              grid[coord.startingX][idx]++;
            }
          }
        } else {
          if (coord.startingX < coord.endingX) {
            for (let idx = coord.startingX; idx <= coord.endingX; idx++) {
              grid[idx][coord.startingY]++;
            }
          } else {
            for (let idx = coord.startingX; idx >= coord.endingX; idx--) {
              grid[idx][coord.startingY]++;
            }
          }
        }
      });

    return grid
      .flat()
      .filter((v) => v && v >= 2)
      .length.toString();
  }

  public part2() {
    const grid: number[][] = this.initGrid();
    this.input_data.forEach((coord) => {
      if (coord.startingX === coord.endingX) {
        if (coord.startingY < coord.endingY) {
          for (let idx = coord.startingY; idx <= coord.endingY; idx++) {
            grid[coord.startingX][idx]++;
          }
        } else {
          for (let idx = coord.startingY; idx >= coord.endingY; idx--) {
            grid[coord.startingX][idx]++;
          }
        }
      } else if (coord.startingY === coord.endingY) {
        if (coord.startingX < coord.endingX) {
          for (let idx = coord.startingX; idx <= coord.endingX; idx++) {
            grid[idx][coord.startingY]++;
          }
        } else {
          for (let idx = coord.startingX; idx >= coord.endingX; idx--) {
            grid[idx][coord.startingY]++;
          }
        }
      } else {
        let idxX = coord.startingX;
        let idxY = coord.startingY;
        if (coord.startingY < coord.endingY && coord.startingX < coord.endingX) {
          while (idxX <= coord.endingX && idxY <= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX++;
            idxY++;
          }
        } else if (coord.startingY > coord.endingY && coord.startingX > coord.endingX) {
          while (idxX >= coord.endingX && idxY >= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX--;
            idxY--;
          }
        } else if (coord.startingY > coord.endingY) {
          while (idxX <= coord.endingX && idxY >= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX++;
            idxY--;
          }
        } else {
          while (idxX >= coord.endingX && idxY <= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX--;
            idxY++;
          }
        }
      }
    });
    return grid
      .flat()
      .filter((v) => v && v >= 2)
      .length.toString();
  }

  private initGrid(): number[][] {
    this.input_data.sort((a, b) => Math.max(b.endingX, b.startingX) - Math.max(a.endingX, a.startingX));
    const maxX = Math.max(this.input_data[0].endingX, this.input_data[0].startingX);
    this.input_data.sort((a, b) => Math.max(b.endingY, b.startingY) - Math.max(a.endingY, a.startingY));
    const maxY = Math.max(this.input_data[0].endingY, this.input_data[0].startingY);
    const grid: number[][] = [];
    for (let idx = 0; idx <= maxX; idx++) {
      grid[idx] = Array(maxY + 1).fill(0);
    }
    return grid;
  }
}

export class Coordinates {
  startingX: number;
  startingY: number;
  endingX: number;
  endingY: number;

  constructor(startingX: number, startingY: number, endingX: number, endingY: number) {
    this.startingX = startingX;
    this.startingY = startingY;
    this.endingX = endingX;
    this.endingY = endingY;
  }
}
