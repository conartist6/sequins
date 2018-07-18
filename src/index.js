import Seq from './seq-factory';
export default Seq;
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
export { default as IndexedSeq } from './sequence-indexed';
export { default as KeyedSeq } from './sequence-keyed';
export { default as SetSeq } from './sequence-set';

