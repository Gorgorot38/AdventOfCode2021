export class Day22 {
  input_data: Input[];
  constructor(input: string[]) {
    this.input_data = input
      .filter((i) => i)
      .map((i) => {
        const matches = i.match(/(-{0,1}[0-9]{1,7})/g) as RegExpMatchArray;
        return new Input(parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2]), parseInt(matches[3]), parseInt(matches[4]), parseInt(matches[5]), i.startsWith('on'));
      });
  }

  public part1(): string {
    const mapOn = new Map<string, boolean>();
    this.input_data
      .filter((d) => d.isLessThan50())
      .forEach((d) => {
        for (let x = d.minX; x <= d.maxX; x++) {
          for (let y = d.minY; y <= d.maxY; y++) {
            for (let z = d.minZ; z <= d.maxZ; z++) {
              mapOn.set([x, y, z].join(';'), d.isOn);
            }
          }
        }
      });
    return [...mapOn.values()].filter((v) => v).length.toString();
  }

  public part2(): string {
    const cubes = new Map<string, number>();
    this.input_data.forEach((d) => {
      const newCubes = new Map<string, number>();
      [...cubes.entries()].forEach((e) => {
        const values = e[0].split(';').map((v) => parseInt(v));

        const minX = Math.max(values[0], d.minX);
        const maxX = Math.min(values[1], d.maxX);
        const minY = Math.max(values[2], d.minY);
        const maxY = Math.min(values[3], d.maxY);
        const minZ = Math.max(values[4], d.minZ);
        const maxZ = Math.min(values[5], d.maxZ);

        // If it is a cube, it intersects with another one so adjust the quantity
        if (minX <= maxX && minY <= maxY && minZ <= maxZ) {
          newCubes.set([minX, maxX, minY, maxY, minZ, maxZ].join(';'), (newCubes.get([minX, maxX, minY, maxY, minZ, maxZ].join(';')) ?? 0) - e[1]);
        }
      });

      // Make sure we turned it on
      if (d.isOn) {
        newCubes.set([d.minX, d.maxX, d.minY, d.maxY, d.minZ, d.maxZ].join(';'), (newCubes.get([d.minX, d.maxX, d.minY, d.maxY, d.minZ, d.maxZ].join(';')) ?? 0) + 1);
      }

      [...newCubes.entries()].forEach((e) => cubes.set(e[0], (cubes.get(e[0]) ?? 0) + e[1]));
    });

    return [...cubes.entries()]
      .reduce((prev, e) => {
        const values = e[0].split(';').map((v) => parseInt(v));
        return prev + Math.abs(values[1] - values[0] + 1) * Math.abs(values[3] - values[2] + 1) * Math.abs(values[5] - values[4] + 1) * e[1];
      }, 0)
      .toString();
  }
}

export class Input {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;

  isOn: boolean;

  constructor(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number, isOn: boolean) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
    this.minZ = minZ;
    this.maxZ = maxZ;
    this.isOn = isOn;
  }

  isLessThan50() {
    return this.minX >= -50 && this.minY >= -50 && this.maxZ >= -50 && this.maxX <= 50 && this.maxY <= 50 && this.maxZ <= 50;
  }

  isInRange(x: number, y: number, z: number) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY && z >= this.minZ && z <= this.maxZ;
  }
}
