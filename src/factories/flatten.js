import { memoizeFactory } from '../utils/memoize';
import reflect from '../utils/reflect';

function makeFlatten(Collection, collectionType, collectionSubtype) {
  const { itemValue, primitiveIterator } = reflect[collectionSubtype];

  return function* flatten(shallowOrDepth, iterable) {
    if (arguments.length === 1) {
      iterable = shallowOrDepth;
      shallowOrDepth = false;
    }
    const depth = shallowOrDepth === true ? 1 : shallowOrDepth === false ? 0 : shallowOrDepth;

    for (const item of iterable) {
      const itemSeq = item == null ? item : Collection.Sequence.from(itemValue(item));

      if (itemSeq && depth !== 1) {
        yield* flatten(depth === 0 ? 0 : depth - 1, primitiveIterator(itemSeq));
      } else if (itemSeq) {
        yield* primitiveIterator(itemSeq);
      } else {
        yield item;
      }
    }
  };
}

export default memoizeFactory(makeFlatten);
