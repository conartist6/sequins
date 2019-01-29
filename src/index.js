import Sequence from './collection-sequence';
import List from './subtypes/concrete/list';
import Map from './subtypes/concrete/map';
import Set from './subtypes/concrete/set';
import IndexedSequence from './subtypes/sequence/indexed';
import KeyedSequence from './subtypes/sequence/keyed';
import SetSequence from './subtypes/sequence/set';
import { NativeMap, NativeSet } from './native';
import {
  isMutableCollection as isCollection,
  isMutableSeq as isSeq,
  isMutableKeyed as isKeyed,
  isMutableIndexed as isIndexed,
  isMutableAssociative as isAssociative,
  isMutableList as isList,
  isMutableMap as isMap,
  isMutableSet as isSet,
} from './utils/shape';
import get from './statics/get';
import set from './statics/set';
import has from './statics/has';
import { keys, values, entries } from './statics/keys-values-entries';
import Range from './statics/range';
import Repeat from './statics/repeat';

function Seq(initial) {
  const seq = Sequence.from(initial);
  if (!seq) {
    throw new Error(`Could not create a sequence out of ${initial}.`);
  }
  return seq;
}

function IndexedSequenceFactory(iterable) {
  return new IndexedSequence(iterable);
}
Object.assign(IndexedSequenceFactory, IndexedSequence);

function KeyedSequenceFactory(iterable) {
  return new KeyedSequence(iterable);
}
Object.assign(KeyedSequenceFactory, KeyedSequence);

function SetSequenceFactory(iterable) {
  return new SetSequence(iterable);
}
Object.assign(SetSequenceFactory, SetSequence);

Seq.Indexed = IndexedSequenceFactory;
Seq.Keyed = KeyedSequenceFactory;
Seq.Set = SetSequenceFactory;

export default {
  Seq,
  IndexedSequence,
  KeyedSequence,
  SetSequence,
  List,
  Map,
  Set,
  NativeMap,
  NativeSet,
  isCollection,
  isKeyed,
  isIndexed,
  isAssociative,
  isSeq,
  isList,
  isMap,
  isSet,
  Range,
  Repeat,
  get,
  set,
  has,
  keys,
  values,
  entries,
};

export {
  Seq,
  IndexedSequence,
  KeyedSequence,
  SetSequence,
  List,
  Map,
  Set,
  NativeMap,
  NativeSet,
  isCollection,
  isKeyed,
  isIndexed,
  isAssociative,
  isSeq,
  isList,
  isMap,
  isSet,
  Range,
  Repeat,
  get,
  set,
  has,
  keys,
  values,
  entries,
};
