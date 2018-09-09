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

export const List = initial => new ListConstructor(initial);
export const Map = initial => new MapConstructor(initial);
export const Set = initial => new SetConstructor(initial);

export default { Seq, List, Map, Set, ...Statics };


