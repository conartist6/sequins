// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import Sequence from './sequence';
import IndexedSeq from './sequence-indexed';
import KeyedSeq from './sequence-keyed';
import SetSeq from './sequence-set';
import { mapish } from './utils/shape';

const emptyArray = [];

export function SeqOrNull(initial) {
  if (initial == null) {
    return new IndexedSeq(emptyArray);
  } else if (initial instanceof Sequence) {
    const SequenceConstructor = initial.constructor;
    return new SequenceConstructor(initial);
  } else if (mapish(initial)) {
    return new KeyedSeq(initial);
  } else if (typeof initial[Symbol.iterator] === 'function') {
    return new IndexedSeq(initial);
  }
  return null;

  // Immutable's logic:
  //   DONE If an Collection, a Seq of the same kind (Keyed, Indexed, or Set).
  //   If an Array-like, an Seq.Indexed.
  //   DONE If an Object with an Iterator, an Seq.Indexed.
  //   If an Iterator, an Seq.Indexed.
  //   If an Object, a Seq.Keyed.
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

export default Seq;
