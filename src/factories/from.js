import { entries } from 'iter-tools';
import { isIndexed, isKeyed, isSet } from '../utils/shape';
import { memoizeFactory } from '../utils/memoize';

const emptyArray = [];

function makeFrom(Collection, collectionSubtype) {
  return function from(initial) {
    if (initial == null) {
      return new Collection[collectionSubtype].Indexed(emptyArray);
    } else if (isIndexed(initial)) {
      return new Collection[collectionSubtype].Indexed(initial);
    } else if (isKeyed(initial)) {
      return new Collection[collectionSubtype].Keyed(initial);
    } else if (isSet(initial)) {
      return new Collection[collectionSubtype].Set(initial);
    } else if (typeof initial[Symbol.iterator] === 'function') {
      return new Collection[collectionSubtype].Indexed(initial);
    } else if (typeof initial === 'object') {
      return new Collection[collectionSubtype].Keyed(entries(initial));
    }
    return null;
  };
}

export default memoizeFactory(makeFrom);
