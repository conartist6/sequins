import { tap, map, filter, reduce } from 'iter-tools';
import forEach from '../transforms/for-each';

export default Base => {
  class IndexedCollection extends Base {
    constructor(iterable) {
      super(iterable, 'Indexed');
    }

    // Collection functions
    tap(tapFn) {
      return this.__doCollectionTransform(tap((value, i) => tapFn(value, i, ...this.__selfParam)));
    }

    map(mapFn) {
      return this.__doCollectionTransform(map((value, i) => mapFn(value, i, ...this.__selfParam)));
    }

    filter(filterFn) {
      return this.__doCollectionTransform(
        filter((value, i) => filterFn(value, i, ...this.__selfParam)),
      );
    }

    filterNot(filterFn) {
      return this.__doCollectionTransform(
        filter((value, i) => !filterFn(value, i, ...this.__selfParam)),
      );
    }

    // Reductive functions
    forEach(eachFn) {
      return forEach((value, i) => eachFn(value, i, ...this.__selfParam), this);
    }

    // Conversions
    toJSON() {
      return this.toArray();
    }
  }

  Object.defineProperty(IndexedCollection.prototype, '@@__MUTABLE_INDEXED__@@', { value: true });

  return IndexedCollection;
};
