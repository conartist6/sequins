import stable from 'stable';
import { memoizeFactory } from '../utils/memoize';
import { ensureArray } from '../utils/array';
import reflect from '../utils/reflect';

const defaultComparator = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

function makeSort(Collection, collectionType, collectionSubtype) {
  const { itemValue, NativeConstructor } = reflect[collectionSubtype];

  return function sort(inPlace, iterable, selector, comparator = defaultComparator) {
    let array = ensureArray(iterable);

    const wrappedComparator = selector
      ? (a, b) => comparator(selector(itemValue(a)), selector(itemValue(b)))
      : (a, b) => comparator(itemValue(a), itemValue(b));

    if (inPlace) {
      stable.inplace(array, wrappedComparator);
    } else {
      array = stable(array, wrappedComparator);
    }

    if (collectionType === 'Sequence' || collectionSubtype === 'Indexed') {
      return array;
    }
    return new NativeConstructor(array);
  };
}

export default memoizeFactory(makeSort);
