export class Day24 {
  input_data: string[];
  modelInputs: number[] = [];
  states: Map<string, number> = new Map();
  constructor(input: string[]) {
    this.input_data = input.filter((i) => i).map((s) => s.replace('\r', ''));
  }

  public part1(): string {
    for (let num = 99999999999999; num >= 10000000000000; num--) {
      if (Array.from(String(num), Number).every((n) => n !== 0)) {
        this.comute(num);
      }

      if (this.modelInputs.length > 0) {
        break;
      }
    }
    this.modelInputs.sort();
    return (this.modelInputs.pop() as number).toString();
  }

  public part2(): string {
    return '';
  }

  comute(model: number) {
    const variable = new Variables();
    Array.from(String(model), Number).forEach((n) => variable.model.enqueue(n));
    let result = false;
    for (let d of this.input_data) {
      const ope = d.split(' ');
      switch (ope[0]) {
        case 'inp':
          result = variable.inp(ope[1]);
          break;
        case 'add':
          result = variable.add(ope[1], ope[2]);
          break;
        case 'mul':
          result = variable.mul(ope[1], ope[2]);
          break;
        case 'div':
          result = variable.div(ope[1], ope[2]);
          break;
        case 'mod':
          result = variable.mod(ope[1], ope[2]);
          break;
        case 'eql':
          result = variable.eql(ope[1], ope[2]);
          break;
        default:
          break;
      }

      if (!result) {
        break;
      }
    }

    if (result && variable.z === 0) {
      this.modelInputs.push(model);
    }
  }
}

export class Variables {
  x = 0;
  y = 0;
  w = 0;
  z = 0;

  model = new Queue<number>();
  passedModel: number[] = [];

  inp(toStore: string): boolean {
    const input = this.model.dequeue() as number;
    this.passedModel.push(input);
    switch (toStore) {
      case 'x':
        this.x = input;
        break;
      case 'y':
        this.y = input;
        break;
      case 'w':
        this.w = input;
        break;
      case 'z':
        this.z = input;
        break;
      default:
        break;
    }
    return true;
  }

  add(toStore: string, input: string): boolean {
    const num = this.getNumInput(input);
    switch (toStore) {
      case 'x':
        this.x += num;
        break;
      case 'y':
        this.y += num;
        break;
      case 'w':
        this.w += num;
        break;
      case 'z':
        this.z += num;
        break;
      default:
        break;
    }
    return true;
  }

  mul(toStore: string, input: string): boolean {
    const num = this.getNumInput(input);
    switch (toStore) {
      case 'x':
        this.x *= num;
        break;
      case 'y':
        this.y *= num;
        break;
      case 'w':
        this.w *= num;
        break;
      case 'z':
        this.z *= num;
        break;
      default:
        break;
    }
    return true;
  }

  div(toStore: string, input: string): boolean {
    const num = this.getNumInput(input);
    if (num === 0) {
      return false;
    }
    switch (toStore) {
      case 'x':
        this.x = Math.trunc(this.x / num);
        break;
      case 'y':
        this.y = Math.trunc(this.y / num);
        break;
      case 'w':
        this.w = Math.trunc(this.w / num);
        break;
      case 'z':
        this.z = Math.trunc(this.z / num);
        break;
      default:
        break;
    }
    return true;
  }

  mod(toStore: string, input: string): boolean {
    const num = this.getNumInput(input);
    if (num <= 0) {
      return false;
    }
    switch (toStore) {
      case 'x':
        if (this.x < 0) {
          return false;
        }
        this.x = this.x % num;
        break;
      case 'y':
        if (this.y < 0) {
          return false;
        }
        this.y = this.y % num;
        break;
      case 'w':
        if (this.w < 0) {
          return false;
        }
        this.w = this.w % num;
        break;
      case 'z':
        if (this.z < 0) {
          return false;
        }
        this.z = this.z % num;
        break;
      default:
        break;
    }
    return true;
  }

  eql(toStore: string, input: string): boolean {
    const num = this.getNumInput(input);
    switch (toStore) {
      case 'x':
        this.x = this.x === num ? 1 : 0;
        break;
      case 'y':
        this.y = this.y === num ? 1 : 0;
        break;
      case 'w':
        this.w = this.w === num ? 1 : 0;
        break;
      case 'z':
        this.z = this.z === num ? 1 : 0;
        break;
      default:
        break;
    }
    return true;
  }

  getNumInput(input: string) {
    switch (input) {
      case 'x':
        return this.x;
      case 'y':
        return this.y;
      case 'w':
        return this.w;
      case 'z':
        return this.z;
      default:
        return parseInt(input);
    }
  }
}

export class Queue<T> {
  private storage: T[] = [];
  timeDequeued: number = 0;

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Queue has reached max capacity, you cannot add more items');
    }
    this.storage.push(item);
  }

  dequeue(): T | undefined {
    this.timeDequeued++;
    return this.storage.shift();
  }

  size(): number {
    return this.storage.length;
  }

  getCurrentPosition(): T {
    return this.storage[0];
  }
}
