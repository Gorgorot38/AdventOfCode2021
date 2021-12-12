export class Day12 {
  input_data: string[];
  paths: Map<string, string[]> = new Map<string, string[]>();

  constructor(input: string[]) {
    this.input_data = input;
    input
      .filter((i) => i)
      .forEach((i) => {
        const start = i.split('-')[0];
        const end = i.split('-')[1];
        if (this.paths.has(start)) {
          this.paths.get(start)?.push(end);
        } else {
          this.paths.set(start, [end]);
        }

        if (this.paths.has(end)) {
          this.paths.get(end)?.push(start);
        } else {
          this.paths.set(end, [start]);
        }
      });
  }

  public part1() {
    const visited = this.visit('start', []);
    return visited.length;
  }

  public part2() {
    const visited = this.visitTwice('start', []);
    return visited.length;
  }

  visit(node: string, visitedNodes: string[]): string[][] {
    const visiting = [...visitedNodes, node];

    if (node === 'end') {
      return [visiting];
    }

    const adjacents = this.paths.get(node);
    const newPaths: string[][] = [];

    adjacents?.forEach((n) => {
      if (n.toLowerCase() === n && visitedNodes.includes(n)) {
        // We can stop
        return;
      }
      newPaths.push(...this.visit(n, visiting));
    });

    return newPaths;
  }

  visitTwice(node: string, visitedNodes: string[]): string[][] {
    const visiting = [...visitedNodes, node];

    if (node === 'end') {
      return [visiting];
    }

    const adjacents = this.paths.get(node);
    const newPaths: string[][] = [];

    adjacents?.forEach((n) => {
      if (n === 'start') {
        return;
      }

      if (n.toLowerCase() === n) {
        const visitedOnce: string[] = [];
        let visitedTwice = false;
        visiting.forEach((v) => {
          if (v === v.toLowerCase()) {
            if (visitedOnce.includes(v)) {
              visitedTwice = true;
            } else {
              visitedOnce.push(v);
            }
          }
        });

        if (visitedTwice && visitedOnce.includes(n)) {
          // Once value has been seen twice, we gucci
          return;
        }
      }
      newPaths.push(...this.visitTwice(n, visiting));
    });

    return newPaths;
  }
}
