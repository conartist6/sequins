import map from 'iter-tools/es5/map';
import filter from 'iter-tools/es5/filter';
import forEach from '../functions/for-each';
import forSome from '../functions/for-some';

export default Base =>
  class SetCollection extends Base {
    constructor(iterable) {
      super(iterable, 'Set');
    }

    // Collection functions
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

    forSome(eachFn) {
      return forSome(item => eachFn(item, item, ...this.__selfParam), this);
    }

    // Conversions
    toJSON() {
      return this.toArray();
    }
  };
