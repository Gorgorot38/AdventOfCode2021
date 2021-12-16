export class Day16 {
  input_data: string[];
  allPackets: Packet[] = [];
  constructor(input: string[]) {
    this.input_data = input[0]
      .split('')
      .map((h) => this.hex2bin(h))
      .join('')
      .split('');
  }

  public part1(): string {
    this.buildData(this.input_data, false);
    return this.getPacketsVersionSum(this.allPackets).toString();
  }

  public part2(): string {
    this.buildData(this.input_data, false);
    return this.getPacketsOperations(this.allPackets[0]).toString();
  }

  private buildData(data: string[], isSubPacket: boolean, currentPacket?: Packet) {
    let idx = 0;
    while (idx < data.length) {
      const packet = new Packet();
      packet.version = parseInt(data.slice(idx, idx + 3).join(''), 2);
      packet.type = parseInt(data.slice(idx + 3, idx + 6).join(''), 2);

      idx += 6;

      if (packet.isLiteralValue()) {
        let isEnd = false;
        while (!isEnd) {
          const bit = data.slice(idx, idx + 5);
          if (bit[0] === '0') {
            isEnd = true;
          }
          packet.value += bit.slice(1, 5).join('');
          idx += 5;
        }
        if (isSubPacket && currentPacket) {
          currentPacket.packets.push(packet);
        } else {
          this.allPackets.push(packet);
        }
      } else {
        packet.operator = data[idx];
        idx++;
        if (packet.operator === '1') {
          const packetNum = parseInt(data.slice(idx, idx + 11).join(''), 2);
          idx += 11;
          for (let tmpIdx = 0; tmpIdx < packetNum; tmpIdx++) {
            idx += this.buildData(data.slice(idx), true, packet);
          }
        } else {
          const packetsLength = parseInt(data.slice(idx, idx + 15).join(''), 2);
          idx += 15;
          const endLength = idx + packetsLength;
          while (idx < endLength) {
            idx += this.buildData(data.slice(idx), true, packet);
          }
        }

        if (!isSubPacket) {
          this.allPackets.push(packet);
        } else {
          currentPacket?.packets.push(packet);
        }
      }

      if (isSubPacket) {
        packet.length = idx;
        return packet.length;
      }

      if (data.slice(idx).every((c) => c === '0')) {
        break;
      }
    }

    return 0;
  }

  private getPacketsVersionSum(packets: Packet[]): number {
    return packets.reduce((prev, p) => prev + p.version + this.getPacketsVersionSum(p.packets), 0);
  }

  private getPacketsOperations(packet: Packet): number {
    switch (packet.type) {
      case 0:
        return packet.packets.reduce((prev, p) => prev + this.getPacketsOperations(p), 0);
      case 1:
        return packet.packets.reduce((prev, p) => prev * this.getPacketsOperations(p), 1);
      case 2:
        return Math.min(...packet.packets.map((p) => this.getPacketsOperations(p)));
      case 3:
        return Math.max(...packet.packets.map((p) => this.getPacketsOperations(p)));
      case 4:
        return packet.getDecimalValue();
      case 5:
        return this.getPacketsOperations(packet.packets[0]) > this.getPacketsOperations(packet.packets[1]) ? 1 : 0;
      case 6:
        return this.getPacketsOperations(packet.packets[0]) < this.getPacketsOperations(packet.packets[1]) ? 1 : 0;
      case 7:
        return this.getPacketsOperations(packet.packets[0]) === this.getPacketsOperations(packet.packets[1]) ? 1 : 0;
      default:
        return 0;
    }
  }

  private hex2bin(hex: string) {
    return parseInt(hex, 16).toString(2).padStart(4, '0');
  }
}

export class Packet {
  version: number = 0;
  type: number = 0;
  operator: string = '';
  packets: Packet[] = [];
  value: string = '';
  length: number = 0;

  isLiteralValue(): boolean {
    return this.type === 4;
  }

  getDecimalValue() {
    return parseInt(this.value, 2);
  }
}
