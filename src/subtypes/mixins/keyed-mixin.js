import { tap, map, filter, reduce } from 'iter-tools';
import forEach from '../../functions/for-each';

export default Base =>
  class extends Base {
    constructor(iterable) {
      super(iterable, 'Keyed');
    }

    // Collection functions
    tap(tapFn) {
      return this.__doCollectionTransform(tap(([key, value]) => tapFn(value, key)));
    }

    map(mapFn) {
      return this.__doCollectionTransform(map(([key, value]) => [key, mapFn(value, key)]));
    }

    mapKeys(mapFn) {
      return this.__doCollectionTransform(map(([key, value]) => [mapFn(key, value), value]));
    }

    mapEntries(mapFn) {
      return this.__doCollectionTransform(map((entry, i) => mapFn(entry, i)));
    }

    flatMap(mapFn) {
      return this.map(mapFn).flatten(true);
    }

    filter(filterFn) {
      return this.__doCollectionTransform(filter(([key, value]) => filterFn(value, key)));
    }

    filterNot(filterFn) {
      return this.__doCollectionTransform(filter(([key, value]) => !filterFn(value, key)));
    }

    // Reductive functions
    reduce(reducer, initial) {
      let invocations = 0;
      let hasInitial = arguments.length > 1;
      const keyedReducer = (acc, [key, value]) => {
        if (invocations++ === 0 && !hasInitial) {
          acc = acc[1];
        }

        return reducer(acc, value, key);
      };
      if (hasInitial) {
        return reduce(initial, keyedReducer, this);
      } else {
        return reduce(keyedReducer, this);
      }
    }

    forEach(eachFn) {
      return forEach(([key, value]) => eachFn(value, key), this);
    }
  };
