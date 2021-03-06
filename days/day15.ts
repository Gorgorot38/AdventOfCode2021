export class Day15 {
  input_data: string[][];
  vertices: Map<string, Node> = new Map();
  constructor(input: string[]) {
    this.input_data = input.filter((i) => i).map((i) => i.split(''));
  }

  public part1(): string {
    this.buildGraph();
    const last = [...this.vertices][[...this.vertices].length - 1][1];
    const count = this.dijkstra(last);
    return count.toString();
  }

  public part2(): string {
    this.buildBiggerData();
    this.buildGraph();
    const last = [...this.vertices][[...this.vertices].length - 1][1];
    const count = this.dijkstra(last);
    return count.toString();
  }

  private buildBiggerData() {
    const initalData: string[][] = [];
    this.input_data.forEach((line) => initalData.push([...line]));
    // Build more lines
    for (let idx = 1; idx < 5; idx++) {
      initalData.forEach((line, y) =>
        line.forEach((col, x) => {
          if (parseInt(col) === 9) {
            initalData[y][x] = '1';
          } else {
            initalData[y][x] = (parseInt(col) + 1).toString();
          }
        })
      );
      initalData.forEach((line) => this.input_data.push([...line]));
    }
    // Build more columns
    this.input_data.forEach((line, y) => {
      const initialLine = [...line];
      for (let idx = 1; idx < 5; idx++) {
        initialLine.forEach((col, x) => {
          if (parseInt(col) === 9) {
            initialLine[x] = '1';
          } else {
            initialLine[x] = (parseInt(col) + 1).toString();
          }
        });
        initialLine.forEach((c) => this.input_data[y].push(c));
      }
    });
  }

  /**
   * Builds adjacency because i like adjacency matrix
   */
  private buildGraph() {
    for (let y = 0; y < this.input_data.length; y++) {
      for (let x = 0; x < this.input_data[0].length; x++) {
        const currentNode = new Node((x + y * this.input_data[0].length).toString(), parseInt(this.input_data[y][x]));
        this.buildEdge(y + 1, x, currentNode);
        this.buildEdge(y, x + 1, currentNode);
        this.buildEdge(y - 1, x, currentNode);
        this.buildEdge(y, x - 1, currentNode);
        this.vertices.set(currentNode.name, currentNode);
      }
    }
  }

  private buildEdge(y: number, x: number, currentNode: Node) {
    if (this.input_data[y] && this.input_data[y][x]) {
      currentNode.neighbors.push(new Node((x + y * this.input_data[0].length).toString(), parseInt(this.input_data[y][x])));
    }
  }

  dijkstra(target: Node) {
    var queue = new PriorityQueue<Node>();
    (this.vertices.get('0') as Node).distance = 0;
    queue.insert(0, this.vertices.get('0') as Node);

    while (!queue.isEmpty()) {
      const current = queue.pop() as Node;
      if (current.isVisited) {
        continue;
      }
      current.isVisited = true;
      (this.vertices.get(current.name) as Node).isVisited = true;

      if (current.name === target.name) {
        return target.distance;
      }

      this.getNeighbours(current).forEach((n) => {
        var dist = current.distance + n.weight;
        if (dist < n.distance) {
          n.distance = dist;
          (this.vertices.get(n.name) as Node).distance = dist;
        }

        if (n.distance !== Number.MAX_SAFE_INTEGER) {
          queue.insert(n.distance, n);
        }
      });
    }
    return target.distance;
  }

  private getNeighbours(node: Node): Node[] {
    return (this.vertices.get(node.name) as Node).neighbors.filter((n) => !(this.vertices.get(n.name) as Node).isVisited).map((n) => this.vertices.get(n.name) as Node);
  }
}

export class Node {
  name: string;
  weight: number;
  distance: number = Number.MAX_SAFE_INTEGER;
  isVisited = false;
  neighbors: Node[] = [];

  constructor(name: string, weight: number) {
    this.name = name;
    this.weight = weight;
  }
}

export interface Heap<T> {
  key: number;
  value: T;
}

export class PriorityQueue<T> {
  heap: Heap<T>[] = [];

  parent = (index: number) => Math.floor((index - 1) / 2);
  left = (index: number) => 2 * index + 1;
  right = (index: number) => 2 * index + 2;
  hasLeft = (index: number) => this.left(index) < this.heap.length;
  hasRight = (index: number) => this.right(index) < this.heap.length;

  swap = (a: number, b: number) => {
    const tmp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = tmp;
  };

  insert(p: number, i: T) {
    this.heap.push({ key: p, value: i });

    let idx = this.heap.length - 1;
    while (idx > 0) {
      const p = this.parent(idx);
      if (this.heap[p].key < this.heap[idx].key) break;
      const tmp = this.heap[idx];
      this.heap[idx] = this.heap[p];
      this.heap[p] = tmp;
      idx = p;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  pop() {
    if (this.heap.length == 0) return null;

    this.swap(0, this.heap.length - 1);
    const item = this.heap.pop();

    let current = 0;
    while (this.hasLeft(current)) {
      let smallerChild = this.left(current);
      if (this.hasRight(current) && this.heap[this.right(current)].key < this.heap[this.left(current)].key) smallerChild = this.right(current);

      if (this.heap[smallerChild].key > this.heap[current].key) break;

      this.swap(current, smallerChild);
      current = smallerChild;
    }

    return item?.value;
  }
}
