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
import { Day10 } from './days/day10';
import { Day11 } from './days/day11';
import { Day12 } from './days/day12';
import { Day13 } from './days/day13';
import { Day14 } from './days/day14';
import { Day15 } from './days/day15';
import { Day16 } from './days/day16';
import { Day17 } from './days/day17';
import { Day18 } from './days/day18';
import { Day19 } from './days/day19';
import { Day20 } from './days/day20';
import { Day21 } from './days/day21';
import { Day22 } from './days/day22';
import { Day24 } from './days/day24';

const file = fs.readFileSync('inputs/input_day24.txt', 'utf8').split('\n');

const day = new Day24(file);

console.log(day.part1());
