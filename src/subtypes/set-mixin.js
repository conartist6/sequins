import { tap, map, filter, reduce } from 'iter-tools';
import forEach from '../transforms/for-each';

export default Base =>
  class SetCollection extends Base {
    constructor(iterable) {
      super(iterable, 'Set');
    }

    // Collection functions
    tap(tapFn) {
      return this.__doCollectionTransform(tap(item => tapFn(item, item, ...this.__selfParam)));
    }

    map(mapFn) {
      return this.__doCollectionTransform(map(item => mapFn(item, item, ...this.__selfParam)));
    }

    filter(filterFn) {
      return this.__doCollectionTransform(
        filter(item => filterFn(item, item, ...this.__selfParam)),
      );
    }

    filterNot(filterFn) {
      return this.__doCollectionTransform(
        filter(item => !filterFn(item, item, ...this.__selfParam)),
      );
    }

    // Reductive functions
    forEach(eachFn) {
      return forEach(item => eachFn(item, item, ...this.__selfParam), this);
    }

    // Conversions
    toJSON() {
      return this.toArray();
    }
  };
