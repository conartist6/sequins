import { memoizeFactory } from '../utils/memoize';
import { isMutableCollection } from '../utils/shape';
import reflect from '../utils/reflect';

function makeFlatten(Collection, collectionType, collectionSubtype) {
  const { itemValue, primitiveIterator } = reflect[collectionSubtype];

  return function* flatten(iterable, shallowOrDepth = false) {
    const depth = Number(shallowOrDepth);

    for (const item of iterable) {
      const value = itemValue(item);

      if (!value || !isMutableCollection(value)) {
        yield item;
      } else {
        if (depth !== 1) {
          yield* flatten(primitiveIterator(value), depth === 0 ? 0 : depth - 1);
        } else {
          yield* primitiveIterator(value);
        }
      }
    }
  };
}

export default memoizeFactory(makeFlatten);
