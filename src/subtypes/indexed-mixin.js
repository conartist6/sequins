import { tap, map, filter, reduce } from 'iter-tools';
import forEach from '../functions/for-each';

export default Base => {
  class IndexedCollection extends Base {
    constructor(iterable) {
      super(iterable, 'Indexed');
    }

    // Collection functions
    tap(tapFn) {
      return this.__doCollectionTransform(tap(tapFn));
    }

    map(mapFn) {
      return this.__doCollectionTransform(map(mapFn));
    }

    filter(filterFn) {
      return this.__doCollectionTransform(filter(filterFn));
    }

    filterNot(filterFn) {
      return this.__doCollectionTransform(filter((item, i) => !filterFn(item, i)));
    }

    // Reductive functions
    reduce(reducer, initial) {
      if (arguments.length === 1) {
        return reduce(reducer, this);
      } else {
        return reduce(initial, reducer, this);
      }
    }

    forEach(eachFn) {
      return forEach(eachFn, this);
    }

    // Conversions
    toJSON() {
      return this.toArray();
    }
  }

  Object.defineProperty(IndexedCollection.prototype, '@@__MUTABLE_INDEXED__@@', { value: true });

  return IndexedCollection;
};
