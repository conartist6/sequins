import { entries } from 'iter-tools';
import { isIndexed, isKeyed, isCollection, isNative, isPlainObj } from '../utils/shape';
import { memoizeFactory } from '../utils/memoize';

const emptyArray = [];

function makeFrom(Collection, collectionType, collectionSubtype) {
  return function from(initial) {
    if (initial == null) {
      return new Collection[collectionType].Indexed(emptyArray);
    } else if (isCollection(initial) || isNative(initial)) {
      if (isIndexed(initial)) {
        return new Collection[collectionType].Indexed(initial);
      } else if (isKeyed(initial)) {
        return new Collection[collectionType].Keyed(initial);
      } else {
        return new Collection[collectionType].Set(initial);
      }
    } else if (typeof initial[Symbol.iterator] === 'function') {
      return new Collection[collectionType].Indexed(initial);
    } else if (isPlainObj(initial)) {
      return new Collection[collectionType].Keyed(entries(initial));
    }
    return null;
  };
}

export default memoizeFactory(makeFrom);
