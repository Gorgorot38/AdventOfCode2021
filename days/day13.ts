import * as fs from 'fs';

export class Day13 {
  input_data: Point[] = [];
  folds: Fold[] = [];
  constructor(input: string[]) {
    input.forEach((i) => {
      if (new RegExp('^([0-9]{1,4}),([0-9]{1,4})$').test(i)) {
        const match = new RegExp('^([0-9]{1,4}),([0-9]{1,4})$').exec(i) as RegExpMatchArray;
        this.input_data.push(new Point(parseInt(match[1]), parseInt(match[2])));
      } else if (new RegExp('^fold along ([a-z])=([0-9]{1,4})$').test(i)) {
        const match = new RegExp('^fold along ([a-z])=([0-9]{1,4})$').exec(i) as RegExpMatchArray;
        this.folds.push(new Fold(match[1], parseInt(match[2])));
      }
    });
  }

  public part1(): string {
    this.fold(this.folds[0].axis, this.folds[0].position);
    return [...new Set(this.input_data.map((i) => `x=${i.x}y=${i.y}`))].length.toString();
  }

  private fold(axis: string, position: number) {
    if (axis === 'x') {
      this.input_data.filter((p) => p.x > position).forEach((p) => (p.x -= (p.x - position) * 2));
      this.input_data = this.input_data.filter((p) => p.x !== position);
    } else {
      this.input_data.filter((p) => p.y > position).forEach((p) => (p.y -= (p.y - position) * 2));
      this.input_data = this.input_data.filter((p) => p.y !== position);
    }
  }

  public part2(): string {
    this.folds.forEach((f, i) => {
      this.fold(f.axis, f.position);
      if (i === this.folds.length - 1)
      this.printFoldedFile();
    });
    return '';
  }

  printFoldedFile() {
    const tmpArray: string[][] = [];
    const ys = this.input_data.map((i) => i.y);
    const xs = this.input_data.map((i) => i.x);
    ys.sort((a, b) => b - a);
    xs.sort((a, b) => b - a);
    const maxY = ys[0];
    const maxX = xs[0];
    for (let idx = 0; idx <= maxY; idx++) {
      tmpArray.push([]);
    }

    for (let y = 0; y <= maxY; y++) {
      for (let x = 0; x <= maxX; x++) {
        const point = this.input_data.find((i) => i.x === x && i.y === y);
        if (point) {
          tmpArray[y][x] = '#';
        } else {
          tmpArray[y][x] = '.';
        }
      }
    }
    var file = fs.createWriteStream(`prints/folds.txt`);
    file.on('error', function (err) {
      /* error handling */
    });
    tmpArray.forEach(function (v) {
      file.write(v.join('') + '\n');
    });
    file.end();
  }
}

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Fold {
  axis: string;
  position: number;
  constructor(axis: string, position: number) {
    this.axis = axis;
    this.position = position;
  }
}
