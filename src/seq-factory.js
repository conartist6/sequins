import Sequence from './sequence';
import './subtypes/sequence/indexed';
import './subtypes/sequence/keyed';
import './subtypes/sequence/set';
import { Range, Repeat } from './static';
import { isIndexed, isKeyed, isSet } from './utils/shape';

function Seq(initial) {
  const seq = Sequence.from(initial);
  if (!seq) {
    throw new Error(`Could not create a sequence out of ${initial}.`);
  }
  return seq;
}
Seq.Indexed = iterable => new Sequence.Indexed(iterable);
Seq.Keyed = iterable => new Sequence.Keyed(iterable);
Seq.Set = iterable => new Sequence.Set(iterable);
Seq.Range = Range;
Seq.Repeat = Repeat;

export default Seq;
