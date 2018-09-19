import Sequence from './collection-sequence';
import { Statics, SequenceStatics } from './statics';
import ListConstructor from './subtypes/concrete/list';
import MapConstructor from './subtypes/concrete/map';
import SetConstructor from './subtypes/concrete/set';
import IndexedSeq from './subtypes/sequence/indexed';
import KeyedSeq from './subtypes/sequence/keyed';
import SetSeq from './subtypes/sequence/set';

export function Seq(initial) {
  const seq = Sequence.from(initial);
  if (!seq) {
    throw new Error(`Could not create a sequence out of ${initial}.`);
  }
  return seq;
}

Seq.Indexed = iterable => new Sequence.Indexed(iterable);
Seq.Keyed = iterable => new Sequence.Keyed(iterable);
Seq.Set = iterable => new Sequence.Set(iterable);
Seq.Range = SequenceStatics.Range;
Seq.Repeat = SequenceStatics.Repeat;

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
