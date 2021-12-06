export class Day06 {
  input_data: number[];
  constructor(input: string[]) {
    this.input_data = input[0].split(',').map((v) => parseFloat(v));
  }

  public part1(): string {
    for (let day = 1; day <= 80; day++) {
      this.input_data.forEach((v, i) => {
        if (this.input_data[i] === 0) {
          this.input_data[i] = 6;
          this.input_data.push(8);
        } else {
          this.input_data[i] = v - 1;
        }
      });
    }
    return this.input_data.length.toString();
  }

  public part2(): string {
    let map = new Map<number, number>([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
    ]);

    this.input_data.forEach((v) => map.set(v, (map.get(v) as number) + 1));
    for (let day = 0; day < 256; day++) {
      map = new Map<number, number>([
        [0, map.get(1) as number],
        [1, map.get(2) as number],
        [2, map.get(3) as number],
        [3, map.get(4) as number],
        [4, map.get(5) as number],
        [5, map.get(6) as number],
        [6, (map.get(7) as number) + (map.get(0) as number)],
        [7, map.get(8) as number],
        [8, map.get(0) as number],
      ]);
    }

    return [...map.entries()].reduce((a, b) => a + b[1], 0).toString();
  }
}
