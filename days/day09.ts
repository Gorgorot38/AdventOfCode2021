import * as fs from 'fs';

export class Day09 {
  input_data: number[][];
  constructor(input: string[]) {
    this.input_data = input.map((v) => v.split('').map((i) => parseInt(i)));
  }

  public part1(): string {
    const positions = this.input_data.map((l) => l.map((p) => new Position(p, false)));
    const result = this.getLowestPositions(positions);
    return result.reduce((prev, current) => prev + 1 + current.pos, 0).toString();
  }

  private getLowestPositions(positions: Position[][]): Position[] {
    const result: Position[] = [];
    for (let y = 0; y < positions.length; y++) {
      for (let x = 0; x < positions[y].length; x++) {
        const up = this.getPosition(y - 1, x, positions).pos;
        const down = this.getPosition(y + 1, x, positions).pos;
        const left = this.getPosition(y, x - 1, positions).pos;
        const right = this.getPosition(y, x + 1, positions).pos;

        const current = positions[y][x];
        if (current.pos < up && current.pos < down && current.pos < left && current.pos < right) {
          current.x = x;
          current.y = y;
          result.push(current);
        }
      }
    }
    return result;
  }

  public part2(): string {
    let result: number[] = [];

    const positions = this.input_data.map((l) => l.map((p) => new Position(p, false)));
    const lowest = this.getLowestPositions(positions);

    lowest.forEach((p) => {
      const neighbours: number[] = [];
      this.searchNeighbours(p.y, p.x, neighbours, positions);
      result.push(neighbours.length);
    });

    result.sort((a, b) => b - a);
    return result
      .slice(0, 3)
      .reduce((prev, current) => prev * current, 1)
      .toString();
  }

  private searchNeighbours(y: number, x: number, neighbours: number[], positions: Position[][]) {
    const up = this.getPosition(y - 1, x, positions);
    const down = this.getPosition(y + 1, x, positions);
    const left = this.getPosition(y, x - 1, positions);
    const right = this.getPosition(y, x + 1, positions);
    if (up.pos < 9 && !up.marked) {
      neighbours.push(up.pos);
      positions[y - 1][x].marked = true;
      this.searchNeighbours(y - 1, x, neighbours, positions);
    }
    if (down.pos < 9 && !down.marked) {
      neighbours.push(down.pos);
      positions[y + 1][x].marked = true;
      this.searchNeighbours(y + 1, x, neighbours, positions);
    }
    if (left.pos < 9 && !left.marked) {
      neighbours.push(left.pos);
      positions[y][x - 1].marked = true;
      this.searchNeighbours(y, x - 1, neighbours, positions);
    }
    if (right.pos < 9 && !right.marked) {
      neighbours.push(right.pos);
      positions[y][x + 1].marked = true;
      this.searchNeighbours(y, x + 1, neighbours, positions);
    }
  }

  private getPosition(y: number, x: number, positions: Position[][]): Position {
    const line = positions[y];
    if (line) {
      const num = line[x];
      if (num && num.pos >= 0) {
        num.y = y;
        num.x = x;
        return num;
      }
    }
    return new Position(Number.MAX_SAFE_INTEGER, false);
  }
}

export class Position {
  pos: number;
  marked: boolean;
  y: number = 0;
  x: number = 0;

  constructor(pos: number, marked: boolean) {
    this.pos = pos;
    this.marked = marked;
  }
}
