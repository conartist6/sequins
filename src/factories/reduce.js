import { reduce as reduceIterable } from 'iter-tools';
import reflect from '../reflect';

const reduceByType = {
  Indexed: function reduce(iterable, reducer, initial) {
    let reduced;
    if (arguments.length > 2) {
      reduced = reduceIterable(initial, reducer, iterable);
    } else {
      reduced = reduceIterable(reducer, iterable);
    }
    return reduced;
  },
  Keyed: function reduce(iterable, reducer, initial) {
    let invocations = 0;
    let hasInitial = arguments.length > 2;
    let reduced;
    const keyedReducer = (acc, [key, value]) => {
      if (invocations++ === 0 && !hasInitial) {
        acc = acc[1];
      }

      return reducer(acc, value, key);
    };
    if (hasInitial) {
      reduced = reduceIterable(initial, keyedReducer, iterable);
    } else {
      reduced = reduceIterable(keyedReducer, iterable);
    }
    return reduced;
  },
  Set: function reduce(iterable, reducer, initial) {
    const setReducer = (acc, item) => reducer(acc, item, item);
    let reduced;
    if (arguments.length > 2) {
      reduced = reduceIterable(initial, setReducer, iterable);
    } else {
      reduced = reduceIterable(setReducer, iterable);
    }
    return reduced;
  },
};

function makeReduce(Collection, collectionSubtype, collectionType) {
  return reduceByType[collectionType];
}

export default makeReduce;