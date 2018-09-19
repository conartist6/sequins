import Sequence from './collection-sequence';
import { Statics, SequenceStatics } from './statics';
import ListConstructor from './subtypes/concrete/list';
import MapConstructor from './subtypes/concrete/map';
import SetConstructor from './subtypes/concrete/set';
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

export function List(initial) {
  return new ListConstructor(initial);
}
Object.assign(List, ListConstructor);

export function Map(initial) {
  return new MapConstructor(initial);
}
Object.assign(Map, MapConstructor);

export function Set(initial) {
  return new SetConstructor(initial);
}
Object.assign(Set, SetConstructor);

export default { Seq, List, Map, Set, ...Statics };
