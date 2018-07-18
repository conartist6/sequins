import Sequence from './sequence';
import IndexedSeq from './sequence-indexed';
import KeyedSeq from './seqeunce-keyed';
import SetSeq from './sequence-set';

function Seq(initial) {
  if (initial instanceof Sequence) {
    const SequenceConstructor = initial.constructor;
    return new SequenceConstructor(initial);
  } else if (typeof initial[Symbol.iterator]) {
    return new IndexedSeq(initial);
  }
  throw new Error(`Could not create a sequence out of ${initial}.`);
  // Immutable's logic:
  //   DONE If an Collection, a Seq of the same kind (Keyed, Indexed, or Set).
  //   If an Array-like, an Seq.Indexed.
  //   DONE If an Object with an Iterator, an Seq.Indexed.
  //   If an Iterator, an Seq.Indexed.
  //   If an Object, a Seq.Keyed.
}
Seq.Indexed = iterable => new IndexedSeq(iterable);
Seq.Keyed = iterable => new KeyedSeq(iterable);
Seq.Set = iterable => new SetSeq(iterable);

export default Seq;
