// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import IndexedSeq from './sequence-indexed';
import KeyedSeq from './sequence-keyed';
import SetSeq from './sequence-set';

export default Object.freeze({
  Indexed: {
    class: IndexedSeq,
    toOwnTypeSeq: seq => seq.toIndexedSeq(),
    itemKey: (item, i) => i,
    itemValue: item => item,
  },
  Keyed: {
    class: KeyedSeq,
    toOwnTypeSeq: seq => seq.toKeyedSeq(),
    itemKey: item => item[0],
    itemValue: item => item[1],
  },
  Set: {
    class: SetSeq,
    toOwnTypeSeq: seq => seq.toSetSeq(),
    itemKey: item => item,
    itemValue: item => item,
  },
});
