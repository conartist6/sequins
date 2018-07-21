import { entries } from 'iter-tools';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import Sequence from './sequence';
import IndexedSeq from './sequence-indexed';
import KeyedSeq from './sequence-keyed';
import SetSeq from './sequence-set';
import { Range, Repeat } from './static';
import { isIndexed, isKeyed, isSet, isIteratorish } from './utils/shape';

const emptyArray = [];

export function SeqOrNull(initial) {
  if (initial == null) {
    return new IndexedSeq(emptyArray);
  } else if (isIndexed(initial)) {
    return new IndexedSeq(initial);
  } else if (isKeyed(initial)) {
    return new KeyedSeq(initial);
  } else if (isSet(initial)) {
    return new SetSeq(initial);
  } else if (typeof initial[Symbol.iterator] === 'function') {
    return new IndexedSeq(initial);
  } else if (typeof initial === 'object') {
    return new KeyedSeq(entries(initial));
  }
  return null;
}

function Seq(initial) {
  const seq = SeqOrNull(initial);
  if (!seq) {
    throw new Error(`Could not create a sequence out of ${initial}.`);
  }
  return seq;
}
Seq.Indexed = iterable => new IndexedSeq(iterable);
Seq.Keyed = iterable => new KeyedSeq(iterable);
Seq.Set = iterable => new SetSeq(iterable);
Seq.Range = Range;
Seq.Repeat = Repeat;

export default Seq;
