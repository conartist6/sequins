import Sequence from "./collection-sequence";
import List from "./subtypes/concrete/list";
import Map from "./subtypes/concrete/map";
import Set from "./subtypes/concrete/set";
import IndexedSeq from "./subtypes/sequence/indexed";
import KeyedSeq from "./subtypes/sequence/keyed";
import SetSeq from "./subtypes/sequence/set";
import {
  isMutableCollection as isCollection,
  isMutableSeq as isSeq,
  isMutableKeyed as isKeyed,
  isMutableIndexed as isIndexed,
  isMutableAssociative as isAssociative,
  isMutableList as isList,
  isMutableMap as isMap,
  isMutableSet as isSet
} from "./utils/shape";
import get from "./statics/get";
import set from "./statics/set";
import has from "./statics/has";
import Range from "./statics/range";
import Repeat from "./statics/repeat";

function Seq(initial) {
  const seq = Sequence.from(initial);
  if (!seq) {
    throw new Error(`Could not create a sequence out of ${initial}.`);
  }
  return seq;
}

function IndexedSeqFactory(iterable) {
  return new IndexedSeq(iterable);
}
Object.assign(IndexedSeqFactory, IndexedSeq);

function KeyedSeqFactory(iterable) {
  return new KeyedSeq(iterable);
}
Object.assign(KeyedSeqFactory, KeyedSeq);

function SetSeqFactory(iterable) {
  return new SetSeq(iterable);
}
Object.assign(SetSeqFactory, SetSeq);

Seq.Indexed = IndexedSeqFactory;
Seq.Keyed = KeyedSeqFactory;
Seq.Set = SetSeqFactory;

export default {
  Seq,
  IndexedSeq,
  KeyedSeq,
  SetSeq,
  List,
  Map,
  Set,
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
  has
};

export {
  Seq,
  IndexedSeq,
  KeyedSeq,
  SetSeq,
  List,
  Map,
  Set,
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
  has
};
