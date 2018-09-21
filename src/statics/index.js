import range from 'iter-tools/es5/range';
import repeat from 'iter-tools/es5/repeat';
import {
  isMutableCollection,
  isMutableKeyed,
  isMutableIndexed,
  isMutableAssociative,
} from '../utils/shape';
import get from './get';
import set from './set';
import has from './has';
import IndexedSeq from '../subtypes/sequence/indexed';

export const Statics = {
  isCollection: isMutableCollection,
  isKeyed: isMutableKeyed,
  isIndexed: isMutableIndexed,
  isAssociative: isMutableAssociative,
  get,
  set,
  has,
};

export const SequenceStatics = {
  Repeat(value, times = Infinity) {
    return new IndexedSeq(repeat(value, times));
  },

  Range(start = 0, end = Infinity, step = 1) {
    return new IndexedSeq(range({ start, step, end }));
  },
};
