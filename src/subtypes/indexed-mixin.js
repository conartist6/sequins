import tap from 'iter-tools/es5/tap';
import map from 'iter-tools/es5/map';
import filter from 'iter-tools/es5/filter';
import forEach from '../functions/for-each';

export default Base => {
  class IndexedCollection extends Base {
    constructor(iterable) {
      super(iterable, 'Indexed');
    }

    // prettier-ignore
    zip(...args) {
      return this.__doCollectionTransform(iterable =>
        this.__dynamicMethods.zip(iterable, ...args),
      );
    }

    zipAll(...args) {
      return this.__doCollectionTransform(iterable =>
        this.__dynamicMethods.zipAll(iterable, ...args),
      );
    }

    zipWith(zipper, ...args) {
      return this.__doCollectionTransform(iterable =>
        map(items => zipper(...items), this.__dynamicMethods.zip(iterable, ...args)),
      );
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
