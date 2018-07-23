import { memoizeFactory } from '../utils/memoize';
import reflect from '../reflect';

function makeFlatten(Collection, collectionType) {
  const { itemValue, toNative } = reflect[collectionType];

  function* flatten(shallowOrDepth, iterable) {
    const depth = shallowOrDepth === true ? 0 : shallowOrDepth;

    for (const item of iterable) {
      const itemSeq = item == null ? item : Collection.from(itemValue(item));

      if (itemSeq && (depth === false || depth > 0)) {
        yield* flatten(depth === false ? depth : depth - 1, toNative(itemSeq));
      } else if (itemSeq) {
        yield* toNative(itemSeq);
      } else {
        yield item;
      }
    }
  }

  function curriedFlatten(shallowOrDepth, iterable) {
    if (!iterable) {
      return iterable => flatten(shallowOrDepth, iterable);
    }
    return flatten(shallowOrDepth, iterable);
  }

  return curriedFlatten;
}

export default memoizeFactory(makeFlatten);
