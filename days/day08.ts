export class Day08 {
  input_data: Segment[];
  constructor(input: string[]) {
    this.input_data = input
      .filter((v) => v)
      .map(
        (v) =>
          new Segment(
            v
              .split(' | ')[0]
              .split(' ')
              .map((s) => s.split('').sort().join('')),
            v
              .split(' | ')[1]
              .split(' ')
              .map((s) => s.split('').sort().join(''))
          )
      );
  }

  public part1(): string {
    return this.input_data
      .map((v) => v.outputs)
      .flat()
      .filter((v) => v.length <= 4 || v.length === 7)
      .length.toString();
  }

  public part2(): string {
    return this.input_data
      .reduce((prev, segment) => {
        const map = new Map<string, number>();
        segment.patterns.forEach((p) => {
          [...p].forEach((c) => {
            if (map.has(c)) {
              map.set(c, (map.get(c) as number) + 1);
            } else {
              map.set(c, 1);
            }
          });
        });
        const digit = new Digit();
        digit.bottomRight = [...map.entries()].find((entry) => entry[1] === 9)?.[0] as string;
        digit.bottomLeft = [...map.entries()].find((entry) => entry[1] === 4)?.[0] as string;
        digit.topLeft = [...map.entries()].find((entry) => entry[1] === 6)?.[0] as string;
        digit.topRight = [...(segment.patterns.find((p) => p.length === 2) as string)].find((c) => c !== digit.bottomRight) as string;
        digit.top = [...map.entries()].find((entry) => entry[1] === 8 && entry[0] !== digit.topRight)?.[0] as string;
        digit.middle = [...(segment.patterns.find((p) => p.length === 4) as string)].find((c) => c !== digit.bottomRight && c !== digit.topRight && c !== digit.topLeft) as string;
        digit.bottom = [...map.entries()].find((entry) => entry[1] === 7 && entry[0] !== digit.middle)?.[0] as string;

        const mapNumbers = this.mapPatternsToNumber(digit, segment);
        return prev + parseInt(segment.outputs.reduce((a, b) => a + mapNumbers.get(b), ''));
      }, 0)
      .toString();
  }

  private mapPatternsToNumber(digit: Digit, segment: Segment): Map<string, string> {
    const map = new Map<string, string>();
    map.set(segment.patterns.find((p) => p.length === 2) as string, '1');
    map.set(segment.patterns.find((p) => p.length === 4) as string, '4');
    map.set(segment.patterns.find((p) => p.length === 7) as string, '8');
    map.set(segment.patterns.find((p) => p.length === 3) as string, '7');
    map.set(segment.patterns.find((p) => !p.includes(digit.middle) && p.length === 6) as string, '0');
    map.set(segment.patterns.find((p) => !p.includes(digit.topRight) && p.length === 6) as string, '6');
    map.set(segment.patterns.find((p) => !p.includes(digit.bottomLeft) && p.length === 6) as string, '9');
    map.set(segment.patterns.find((p) => !p.includes(digit.topLeft) && !p.includes(digit.bottomLeft) && p.length === 5) as string, '3');
    map.set(segment.patterns.find((p) => !p.includes(digit.topLeft) && !p.includes(digit.bottomRight) && p.length === 5) as string, '2');
    map.set(segment.patterns.find((p) => !p.includes(digit.topRight) && !p.includes(digit.bottomLeft) && p.length === 5) as string, '5');

    return map;
  }
}

export class Segment {
  patterns: string[];
  outputs: string[];

  constructor(patterns: string[], outputs: string[]) {
    this.patterns = patterns;
    this.outputs = outputs;
  }
}

export class Digit {
  top = '';
  topLeft = '';
  topRight = '';
  bottom = '';
  bottomLeft = '';
  bottomRight = '';
  middle = '';
}
