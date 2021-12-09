import { Day01 } from './days/day01';
import * as fs from 'fs';
import { Day02 } from './days/day02';
import { Day03 } from './days/day03';
import { Day04 } from './days/day04';
import { Day05 } from './days/day05';
import { Day06 } from './days/day06';
import { Day07 } from './days/day07';
import { Day08 } from './days/day08';
import { Day09 } from './days/day09';

const file = fs.readFileSync('inputs/input_day09.txt', 'utf8').split('\n');

const day = new Day09(file);

console.log(day.part2());
