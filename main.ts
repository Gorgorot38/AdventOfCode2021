import { Day01 } from './days/day01';
import * as fs from 'fs';
import { Day02 } from './days/day02';
import { Day03 } from './days/day03';
import { Day04 } from './days/day04';
import { Day05 } from './days/day05';

const file = fs.readFileSync('inputs/input_day05.txt', 'utf8').split('\n');

const day = new Day05(file);

console.log(day.part2());
