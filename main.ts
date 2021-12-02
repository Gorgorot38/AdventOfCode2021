import { Day01 } from './days/day01';
import * as fs from 'fs';
import { Day02 } from './days/day02';

const file = fs.readFileSync('inputs/input_day02.txt', 'utf8').split('\n');

const day = new Day02(file);

console.log(day.part2());
