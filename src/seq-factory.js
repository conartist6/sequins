import { entries } from 'iter-tools';
import Sequence from './sequence';
import { Range, Repeat } from './static';
import { isIndexed, isKeyed, isSet } from './utils/shape';

function Seq(initial) {
  const seq = Sequence.from(initial);
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
