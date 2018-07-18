import { iter } from 'iter-tools';
import { SeqOrNull } from '../seq-factory';
import reflect from '../reflect';
import memoize from 'memoizee';

function makeFlatten(sequenceType) {
  const { itemValue, toOwnTypeSeq } = reflect[sequenceType];

  function* flatten(shallowOrDepth, iterable) {
    const depth = shallowOrDepth === true ? 0 : shallowOrDepth;

    for (const item of iter(iterable)) {
      const itemSeq = item == null ? item : SeqOrNull(itemValue(item));

      if (itemSeq && (depth === false || depth > 0)) {
        yield* flatten(depth === false ? depth : depth - 1, toOwnTypeSeq(itemSeq));
      } else if (itemSeq) {
        yield* toOwnTypeSeq(itemSeq);
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

export default memoize(makeFlatten);
