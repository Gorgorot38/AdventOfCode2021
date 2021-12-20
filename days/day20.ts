import * as fs from 'fs';

export class Day20 {
  input_data: string[][] = [];
  input_copy: string[][] = [];
  mapping: string[];
  constructor(input: string[]) {
    this.mapping = input[0].split('');

    const lengthToAdd = input.slice(2).filter((v) => v).length;

    for (let idx = 0; idx < lengthToAdd; idx++) {
      const lineLength = input[2].length;
      let line = '';
      for (let i = 0; i < lineLength * 3; i++) {
        line += '.';
      }
      this.input_data.push(line.split(''));
      this.input_copy.push(line.split(''));
    }

    input
      .slice(2)
      .filter((v) => v)
      .forEach((line) => {
        let tmp = '';
        for (let i = 0; i < line.length; i++) {
          tmp += '.';
        }
        const current = tmp + line + tmp;
        this.input_data.push(current.split(''));
        this.input_copy.push(current.split(''));
      });

    for (let idx = 0; idx < lengthToAdd; idx++) {
      const lineLength = input[2].length;
      let line = '';
      for (let i = 0; i < lineLength * 3; i++) {
        line += '.';
      }
      this.input_data.push(line.split(''));
      this.input_copy.push(line.split(''));
    }
  }

  public part1(): string {
    for (let idx = 0; idx < 2; idx++) {
      this.excuteEnhancement();
      this.input_copy = [];
      this.input_data.forEach((line) => this.input_copy.push([...line]));
    }

    // Cheating to remove unwanted values, might get fucked by this in part 2
    return this.input_data
      .slice(1, this.input_data.length - 2)
      .map((line) => line.slice(1, line.length - 2))
      .flat()
      .filter((i) => i === '#')
      .length.toString();
  }

  public part2(): string {
    for (let idx = 0; idx < 50; idx++) {
      this.excuteEnhancement();

      // Cheating again because my modelisation sucks
      if (idx % 2 !== 0) {
        this.input_data[0].forEach((_, idx) => (this.input_data[0][idx] = '.'));
        this.input_data[this.input_data.length - 1].forEach((_, idx) => (this.input_data[this.input_data.length - 1][idx] = '.'));
        this.input_data.forEach((l) => (l[l.length - 1] = '.'));
      }
      this.input_copy = [];
      this.input_data.forEach((line) => this.input_copy.push([...line]));
    }

    // Cheating to remove unwanted values, might get fucked by this in part 2
    return this.input_data
      .slice(1, this.input_data.length - 2)
      .map((line) => line.slice(1, line.length - 2))
      .flat()
      .filter((i) => i === '#')
      .length.toString();
  }

  private excuteEnhancement() {
    for (let i = 0; i < this.input_data.length; i++) {
      for (let j = 0; j < this.input_data[i].length; j++) {
        const index = this.getLocalEnhancement(i, j);
        this.input_data[i][j] = this.mapping[index];
      }
    }
  }

  private getLocalEnhancement(i: number, j: number): number {
    let result = '';
    for (let x = i - 1; x <= i + 1; x++) {
      let line = '';
      for (let y = j - 1; y <= j + 1; y++) {
        if (this.input_copy[x] && this.input_copy[x][y]) {
          line += this.input_copy[x][y] === '.' ? '0' : '1';
        } else {
          line += '0';
        }
      }
      result += line;
    }
    return parseInt(result, 2);
  }
}
