export class Day25 {
  input_data: string[][];
  input_copy: string[][] = [];
  constructor(input: string[]) {
    this.input_data = input
      .filter((i) => i)
      .map((s) => s.replace('\r', ''))
      .map((i) => i.split(''));
    this.copy();
  }

  public part1(): string {
    let steps = 0;
    while (true) {
      const hasMoved = this.step();
      steps++;
      if (!hasMoved) {
        return steps.toString();
      }
    }
  }

  public part2(): string {
    return '';
  }

  private copy() {
    this.input_copy = [];
    this.input_data.forEach((line, y) => this.input_copy.push([...line]));
  }

  private step(): boolean {
    let hasMoved = false;
    this.input_copy.forEach((line, y) =>
      line.forEach((c, x) => {
        if (c === '>' && x === line.length - 1 && line[0] === '.') {
          this.input_data[y][0] = '>';
          this.input_data[y][x] = '.';
          hasMoved = true;
        } else if (c === '>' && line[x + 1] && line[x + 1] === '.') {
          this.input_data[y][x + 1] = '>';
          this.input_data[y][x] = '.';
          hasMoved = true;
        }
      })
    );

    this.copy();

    this.input_copy.forEach((line, y) =>
      line.forEach((c, x) => {
        if (c === 'v' && y === this.input_data.length - 1 && this.input_copy[0][x] === '.') {
          this.input_data[0][x] = 'v';
          this.input_data[y][x] = '.';
          hasMoved = true;
        } else if (c === 'v' && this.input_copy[y + 1] && this.input_copy[y + 1][x] === '.') {
          this.input_data[y + 1][x] = 'v';
          this.input_data[y][x] = '.';
          hasMoved = true;
        }
      })
    );

    this.copy();

    return hasMoved;
  }
}
