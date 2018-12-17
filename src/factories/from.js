import { isIndexed, isKeyed, isCollection, isNative, isPlainObj } from '../utils/shape';
import { memoizeFactory } from '../utils/memoize';

const emptyArray = [];

function makeFrom(Collection, collectionType) {
  const TypedCollection = Collection[collectionType];

  return function from(initial) {
    if (initial == null) {
      return new TypedCollection.Indexed(emptyArray);
    } else if (isCollection(initial) || isNative(initial)) {
      if (isIndexed(initial)) {
        return new TypedCollection.Indexed(initial);
      } else if (isKeyed(initial)) {
        return new TypedCollection.Keyed(initial);
      } else {
        return new TypedCollection.Duplicated(initial);
      }
    } else if (typeof initial[Symbol.iterator] === 'function') {
      return new TypedCollection.Indexed(initial);
    } else if (isPlainObj(initial)) {
      return new TypedCollection.Keyed(initial);
    }
    return null;
  };
}

export default memoizeFactory(makeFrom);
