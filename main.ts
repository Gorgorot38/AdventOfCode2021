import { Day01 } from './days/day01';
import * as fs from 'fs';

const file = fs.readFileSync('inputs/input_day01.txt', 'utf8').split('\n');

const day01 = new Day01(file);

console.log(day01.part2());
