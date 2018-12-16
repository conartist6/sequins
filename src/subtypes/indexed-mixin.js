import map from 'iter-tools/es5/map';
import filter from 'iter-tools/es5/filter';
import interpose from 'iter-tools/es5/interpose';
import forEach from '../functions/for-each';
import forSome from '../functions/for-some';

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

    interpose(separator) {
      return this.__doCollectionTransform(interpose(separator));
    }

    // Collection functions
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

    forSome(eachFn) {
      return forSome((value, i) => eachFn(value, i, ...this.__selfParam), this);
    }

    // Conversions
    toJSON() {
      return this.toArray();
    }
  }

  Object.defineProperty(IndexedCollection.prototype, '@@__MUTABLE_INDEXED__@@', { value: true });

  return IndexedCollection;
};
