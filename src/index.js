import Seq from './seq-factory';
export default Seq;

export { default as IndexedSeq } from './subtypes/sequence/indexed';
export { default as KeyedSeq } from './subtypes/sequence/keyed';
export { default as SetSeq } from './subtypes/sequence/set';
export { default as List } from './subtypes/concrete/list';
export { default as Map } from './subtypes/concrete/map';
export { default as Set } from './subtypes/concrete/set';
