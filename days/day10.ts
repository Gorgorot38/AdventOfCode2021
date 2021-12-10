export class Day10 {
  input_data: Line[];
  incomplete_lines: Line[] = [];
  constructor(input: string[]) {
    this.input_data = input.filter((v) => v).map((v) => new Line(v));
  }

  public part1(): string {
    let result = 0;
    const openings = ['(', '[', '<', '{'];
    this.input_data.forEach((line) => {
      const opens: string[] = [];
      const chars = line.content.split('');
      for (let char of chars) {
        if (openings.includes(char)) {
          opens.push(char);
        } else {
          const last = opens.pop() as string;
          if (!this.isMatching(last, char)) {
            line.isCorrupted = true;
            result += this.getCorruptedPoints(char);
            break;
          }
        }
      }
      if (!line.isCorrupted) {
        line.isIncomplete = true;
      }
    });
    this.incomplete_lines = this.input_data.filter((l) => l.isIncomplete);
    return result.toString();
  }

  private isMatching(opening: string, closing: string): boolean {
    switch (opening) {
      case '(':
        return closing === ')';
      case '[':
        return closing === ']';
      case '<':
        return closing === '>';
      case '{':
        return closing === '}';
      default:
        return false;
    }
  }

  private getCorruptedPoints(val: string): number {
    switch (val) {
      case ')':
        return 3;
      case ']':
        return 57;
      case '}':
        return 1197;
      case '>':
        return 25137;
      default:
        return 0;
    }
  }

  public part2(): string {
    this.part1();
    const openings = ['(', '[', '<', '{'];
    const scores: number[] = [];
    this.incomplete_lines.forEach((line) => {
      const opens: string[] = [];
      const chars = line.content.split('');
      chars.forEach((c) => {
        if (openings.includes(c)) {
          opens.push(c);
        } else {
          opens.pop();
        }
      });
      scores.push(
        opens
          .reverse()
          .map((c) => this.getClosingChar(c))
          .reduce((prev, current) => prev * 5 + this.getIncompletePoints(current), 0)
      );
    });

    scores.sort((a, b) => a - b);
    return scores[(scores.length - 1) / 2].toString();
  }

  private getClosingChar(val: string) {
    switch (val) {
      case '(':
        return ')';
      case '[':
        return ']';
      case '<':
        return '>';
      case '{':
        return '}';
      default:
        return '';
    }
  }

  private getIncompletePoints(val: string): number {
    switch (val) {
      case ')':
        return 1;
      case ']':
        return 2;
      case '}':
        return 3;
      case '>':
        return 4;
      default:
        return 0;
    }
  }
}

export class Line {
  content: string;
  isCorrupted: boolean = false;
  isIncomplete: boolean = false;

  constructor(content: string) {
    this.content = content;
  }
}
