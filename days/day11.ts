export class Day11 {
  input_data: Octopus[][];
  constructor(input: string[]) {
    this.input_data = input.map((v) => v.split('').map((i) => new Octopus(parseInt(i))));
  }

  public part1(): string {
    for (let step = 0; step < 100; step++) {
      this.input_data.forEach((line) =>
        line.forEach((o) => {
          o.flashValue++;
          o.hasFlashed = false;
        })
      );
      for (let y = 0; y < this.input_data.length; y++) {
        for (let x = 0; x < this.input_data[y].length; x++) {
          this.handleFlashes(y, x);
        }
      }
    }
    return this.input_data
      .flat()
      .map((o) => o.timeFlashed)
      .reduce((prev, current) => prev + current, 0)
      .toString();
  }

  private handleFlashes(y: number, x: number) {
    if (this.input_data[y][x].flashValue > 9 && !this.input_data[y][x].hasFlashed) {
      this.input_data[y][x].flashValue = 0;
      this.input_data[y][x].hasFlashed = true;
      this.input_data[y][x].timeFlashed++;

      for (let tmpY = y - 1; tmpY <= y + 1; tmpY++) {
        for (let tmpX = x - 1; tmpX <= x + 1; tmpX++) {
          if (
            (tmpY !== y || tmpX !== x) &&
            this.input_data[tmpY] &&
            this.input_data[tmpY][tmpX] &&
            this.input_data[tmpY][tmpX].flashValue <= 9 &&
            this.input_data[tmpY][tmpX].flashValue !== 0
          ) {
            this.input_data[tmpY][tmpX].flashValue++;
            this.handleFlashes(tmpY, tmpX);
          }
        }
      }
    }
  }

  public part2(): string {
    let step = 0;
    while (this.input_data.some((l) => l.some((i) => i.flashValue !== 0))) {
      this.input_data.forEach((line) =>
        line.forEach((o) => {
          o.flashValue++;
          o.hasFlashed = false;
        })
      );
      for (let y = 0; y < this.input_data.length; y++) {
        for (let x = 0; x < this.input_data[y].length; x++) {
          this.handleFlashes(y, x);
        }
      }
      step++;
    }
    return step.toString();
  }
}

export class Octopus {
  flashValue: number;
  timeFlashed = 0;
  hasFlashed = false;

  constructor(flash: number) {
    this.flashValue = flash;
  }
}
