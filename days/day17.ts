export class Day17 {
  target: Area;
  workingVelocities: Point[] = [];
  maxes: number[] = [];
  constructor(input: string[]) {
    const regex = new RegExp('^target area: x=([0-9-]{1,5})..([0-9-]{1,5}), y=([0-9-]{1,5})..([0-9-]{1,5})$').exec(input[0]) as RegExpExecArray;
    this.target = new Area(parseInt(regex[1]), parseInt(regex[2]), parseInt(regex[3]), parseInt(regex[4]));
  }

  public part1(): string {
    for (let y = 0; y < 1000; y++) {
      for (let x = 0; x < 1000; x++) {
        this.buildVelocityStuff(x, y);
      }
    }
    return Math.max(...this.maxes).toString();
  }

  public part2(): string {
    for (let y = -1000; y < 1000; y++) {
      for (let x = -1000; x < 1000; x++) {
        this.buildVelocityStuff(x, y);
      }
    }
    return this.workingVelocities.length.toString();
  }

  buildVelocityStuff(x: number, y: number) {
    const startPoint = new Point(0, 0);
    const startingVelocity = new Point(x, y);
    const velocity = new Point(x, y);
    let maxY = 0;

    while (!startPoint.isInTarget(this.target)) {
      startPoint.x += velocity.x;
      startPoint.y += velocity.y;

      if (startPoint.y > maxY) {
        maxY = startPoint.y;
      }

      if (startPoint.isOutOfTarget(this.target)) {
        break;
      }
      if (startPoint.isInTarget(this.target)) {
        this.workingVelocities.push(startingVelocity);
        this.maxes.push(maxY);
        break;
      }

      if (velocity.x > 0) {
        velocity.x -= 1;
      } else if (velocity.x < 0) {
        velocity.x += 1;
      }
      velocity.y -= 1;
    }
  }
}

export class Area {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  constructor(minX: number, maxX: number, minY: number, maxY: number) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }
}

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isInTarget(area: Area) {
    return this.x >= area.minX && this.x <= area.maxX && this.y >= area.minY && this.y <= area.maxY;
  }

  isOutOfTarget(area: Area) {
    return this.x > area.maxX || this.y < area.minY;
  }
}
