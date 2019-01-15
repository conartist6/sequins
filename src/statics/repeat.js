import repeat from 'iter-tools/es5/repeat';
import IndexedSeq from '../subtypes/sequence/indexed';

export default function Repeat(value, times = Infinity) {
  return new IndexedSeq(repeat(value, times));
}
