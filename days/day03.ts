export class Day03 {
  input_data: string[];
  constructor(input: string[]) {
    this.input_data = input.filter((val) => val);
  }

  public part1(): string {
    let gamma = '';
    let epsilon = '';
    for (let idx = 0; idx < this.input_data[0].length; idx++) {
      const currentArray = this.input_data.map((el) => el[idx]);
      gamma += this.getCommonValue(currentArray, true);
      epsilon += this.getCommonValue(currentArray, false);
    }
    return (parseInt(gamma, 2) * parseInt(epsilon, 2)).toString();
  }

  private getCommonValue(array: string[], most: boolean): string {
    const map = new Map<string, number>();
    array.forEach((el) => {
      const current = map.get(el) ?? 0;
      map.set(el, current + 1);
    });

    if (most) {
      if ([...map.entries()].every((e) => e[1] == [...map.entries()][0][1])) {
        return '1';
      }
      return [...map.entries()].sort((a, b) => b[1] - a[1])[0][0];
    } else {
      if ([...map.entries()].every((e) => e[1] == [...map.entries()][0][1])) {
        return '0';
      }
      return [...map.entries()].sort((a, b) => a[1] - b[1])[0][0];
    }
  }

  public part2() {
    let oxigens = [...this.input_data];
    let co2s = [...this.input_data];

    for (let idx = 0; idx < this.input_data[0].length; idx++) {
      if (oxigens.length !== 1) {
        const currentArray = oxigens.map((el) => el[idx]);
        const mostCommon = this.getCommonValue(currentArray, true);
        oxigens = oxigens.filter((o) => o[idx] === mostCommon);
      }

      if (co2s.length !== 1) {
        const currentArray = co2s.map((el) => el[idx]);
        const leastCommon = this.getCommonValue(currentArray, false);
        co2s = co2s.filter((o) => o[idx] === leastCommon);
      }
    }

    return (parseInt(oxigens[0], 2) * parseInt(co2s[0], 2)).toString();
  }
}
