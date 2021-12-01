export class Day01 {
  input_data: string[];
  constructor(input: string[]) {
    this.input_data = input;
  }

  public part1(): string {
    return this.input_data.filter((d, i) => this.input_data[i - 1] && parseInt(d) > parseInt(this.input_data[i - 1])).length.toString();
  }

  public part2(): string {
    return this.input_data
      .filter((value, idx) => value && this.input_data[idx + 1] && this.input_data[idx + 2])
      .map((value, idx) => parseInt(value) + parseInt(this.input_data[idx + 1]) + parseInt(this.input_data[idx + 2]))
      .filter((value, idx, current) => this.input_data[idx - 1] && value > current[idx - 1])
      .length.toString();
  }
}
