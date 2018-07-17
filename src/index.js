import IndexedSeq from './sequence-indexed';
import KeyedSeq from './seqeunce-keyed';
import SetSeq from './sequence-set';

function Seq(iterable) {}
Seq.Indexed = iterable => new IndexedSeq(iterable);
Seq.Keyed = iterable => new KeyedSeq(iterable);
Seq.Set = iterable => new SetSeq(iterable);

export default Seq;
