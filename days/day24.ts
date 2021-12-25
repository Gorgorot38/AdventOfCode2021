export class Day24 {
  input_data: string[];
  toCheck: Analysed[] = [];
  stack: Result[] = [];
  result: number[] = [];
  constructor(index: string[]) {
    this.input_data = index.filter((i) => i).map((s) => s.replace('\r', ''));
    this.input_data.forEach((_, i) => {
      if (i % 18 === 0) {
        const a = new Analysed();
        a.check = parseInt(this.input_data[i + 5].split(' ')[2]);
        a.offset = parseInt(this.input_data[i + 15].split(' ')[2]);
        this.toCheck.push(a);
      }
    });
  }

  public part1(): string {
    for (let idx = 0; idx < 14; idx++) {
      if (this.toCheck[idx].check > 0) {
        this.stack.push(new Result(idx, this.toCheck[idx].offset));
      } else {
        const last = this.stack.pop() as Result;
        const modifier = last.value + this.toCheck[idx].check;
        if (modifier >= 0) {
          this.result[last.index] = 9 - Math.abs(modifier);
          this.result[idx] = 9;
        } else {
          this.result[idx] = 9 - Math.abs(modifier);
          this.result[last.index] = 9;
        }
      }
    }
    return this.result.join('');
  }

  public part2(): string {
    for (let idx = 0; idx < 14; idx++) {
      if (this.toCheck[idx].check > 0) {
        this.stack.push(new Result(idx, this.toCheck[idx].offset));
      } else {
        const last = this.stack.pop() as Result;
        const modifier = last.value + this.toCheck[idx].check;
        if (modifier >= 0) {
          this.result[last.index] = 1;
          this.result[idx] = 1 + Math.abs(modifier);
        } else {
          this.result[idx] = 1;
          this.result[last.index] = 1 + Math.abs(modifier);
        }
      }
    }
    return this.result.join('');
  }
}

export class Analysed {
  check = 0;
  offset = 0;
}

export class Result {
  index: number;
  value: number;
  constructor(i: number, v: number) {
    this.index = i;
    this.value = v;
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
