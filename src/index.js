import Sequence from './collection-sequence';
import { Statics, SequenceStatics } from './statics';
import List from './subtypes/concrete/list';
import Map from './subtypes/concrete/map';
import Set from './subtypes/concrete/set';
import IndexedSeqConstructor from './subtypes/sequence/indexed';
import KeyedSeqConstructor from './subtypes/sequence/keyed';
import SetSeqConstructor from './subtypes/sequence/set';

export function Seq(initial) {
  const seq = Sequence.from(initial);
  if (!seq) {
    throw new Error(`Could not create a sequence out of ${initial}.`);
  }
  return seq;
}

function IndexedSeq(iterable) {
  return new IndexedSeqConstructor(iterable);
}
Object.assign(IndexedSeq, Sequence.Indexed);

function KeyedSeq(iterable) {
  return new KeyedSeqConstructor(iterable);
}
Object.assign(KeyedSeq, Sequence.Keyed);

function SetSeq(iterable) {
  return new SetSeqConstructor(iterable);
}
Object.assign(SetSeq, Sequence.Set);

Seq.Indexed = IndexedSeq;
Seq.Keyed = KeyedSeq;
Seq.Set = SetSeq;
Object.assign(Seq, SequenceStatics);

export default { Seq, IndexedSeq, KeyedSeq, SetSeq, List, Map, Set, ...Statics };
