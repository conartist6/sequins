import { memoizeFactory } from '../utils/memoize';
import reflect from '../utils/reflect';

function makeFlatten(Collection, collectionType, collectionSubtype) {
  const { itemValue, primitiveIterator } = reflect[collectionSubtype];

  return function* flatten(iterable, shallowOrDepth = false) {
    const depth = shallowOrDepth === true ? 1 : shallowOrDepth === false ? 0 : shallowOrDepth;

    for (const item of iterable) {
      const itemSeq = item == null ? item : Collection.Sequence.from(itemValue(item));

      if (itemSeq && depth !== 1) {
        yield* flatten(primitiveIterator(itemSeq), depth === 0 ? 0 : depth - 1);
      } else if (itemSeq) {
        yield* primitiveIterator(itemSeq);
      } else {
        yield item;
      }
    }
  };
}

export default memoizeFactory(makeFlatten);
