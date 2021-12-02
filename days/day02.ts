export class Day02 {
  input_data: string[];
  constructor(input: string[]) {
    this.input_data = input.filter(val => val);
  }

  public part1(): string {
    const depth = this.input_data
      .filter((i) => i.includes('up') || i.includes('down'))
      .map((i) => {
        if (i.includes('up')) {
          return -parseInt(i.replace(/^\D+/g, ''));
        } else {
          return parseInt(i.replace(/^\D+/g, ''));
        }
      })
      .reduce((a, b) => a + b, 0);
    const length = this.input_data
      .filter((i) => i.includes('forward'))
      .map((i) => parseInt(i.replace(/^\D+/g, '')))
      .reduce((a, b) => a + b, 0);

    return (depth * length).toString();
  }

  public part2() {
    let aim = 0;
    let depth = 0;
    let length = 0;

    this.input_data.forEach((val) => {
      if (val.includes('up')) {
        aim -= parseFloat(val.replace(/^\D+/g, ''));
      } else if (val.includes('down')) {
        aim += parseFloat(val.replace(/^\D+/g, ''));
      } else {
        length += parseFloat(val.replace(/^\D+/g, ''));
        depth += parseFloat(val.replace(/^\D+/g, '')) * aim;
      }
    });

    return (depth * length).toString();
  }
}
