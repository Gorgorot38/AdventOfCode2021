export class Day07 {
  input_data: number[];
  constructor(input: string[]) {
    this.input_data = input[0].split(',').map((v) => parseFloat(v));
  }

  public part1(): string {
    this.input_data.sort((a, b) => b - a);
    const max = this.input_data[0];
    this.input_data.sort((a, b) => a - b);
    const min = this.input_data[0];

    var fuel = Number.MAX_SAFE_INTEGER;
    for (let idx = min; idx <= max; idx++) {
      const tmpInput = [...this.input_data];
      let tmpFuel = 0;
      tmpInput.forEach((v) => {
        tmpFuel += Math.abs(v - idx);
      });

      if (tmpFuel <= fuel) {
        fuel = tmpFuel;
      }
    }
    return fuel.toString();
  }

  public part2() {
    this.input_data.sort((a, b) => b - a);
    const max = this.input_data[0];
    this.input_data.sort((a, b) => a - b);
    const min = this.input_data[0];

    var fuel = Number.MAX_SAFE_INTEGER;
    for (let idx = min; idx <= max; idx++) {
      const tmpInput = [...this.input_data];
      let tmpFuel = 0;
      tmpInput.forEach((v) => {
        let fuelCost = 1;
        while (v !== idx) {
          if (v >= idx) {
            v--;
          } else {
            v++;
          }
          tmpFuel += fuelCost;
          fuelCost++;
        }
      });

      if (tmpFuel <= fuel) {
        fuel = tmpFuel;
      }
    }
    return fuel.toString();
  }
}
