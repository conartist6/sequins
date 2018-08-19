import { tap, map, filter, reduce } from 'iter-tools';
import forEach from '../functions/for-each';

export default Base =>
  class SetCollection extends Base {
    constructor(iterable) {
      super(iterable, 'Set');
    }

    // Collection functions
    tap(tapFn) {
      return this.__doCollectionTransform(tap(item => tapFn(item, item)));
    }

    map(mapFn) {
      return this.__doCollectionTransform(map(item => mapFn(item, item)));
    }

    filter(filterFn) {
      return this.__doCollectionTransform(filter(item => filterFn(item, item)));
    }

    filterNot(filterFn) {
      return this.__doCollectionTransform(filter(item => !filterFn(item, item)));
    }

    // Reductive functions
    forEach(eachFn) {
      return forEach(item => eachFn(item, item), this);
    }

    // Conversions
    toJSON() {
      return this.toArray();
    }
  };
