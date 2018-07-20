import { range, repeat } from 'iter-tools';
import IndexedSeq from './sequence-indexed';

export function Repeat(value, times = Infinity) {
  return new IndexedSeq(repeat(value, times));
}

export function Range(start = 0, end = Infinity, step = 1) {
  return new IndexedSeq(range({ start, step, end }));
}
