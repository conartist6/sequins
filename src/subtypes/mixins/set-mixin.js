import { tap, map, filter, reduce } from 'iter-tools';
import forEach from '../../functions/for-each';

export default Base =>
  class extends Base {
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

    flatMap(mapFn) {
      return this.map(mapFn).flatten(true);
    }

    filter(filterFn) {
      return this.__doCollectionTransform(filter(item => filterFn(item, item)));
    }

    filterNot(filterFn) {
      return this.__doCollectionTransform(filter(item => !filterFn(item, item)));
    }

    // Reductive functions
    reduce(reducer, initial) {
      const setReducer = (acc, item) => reducer(acc, item, item);
      if (arguments.length === 1) {
        return reduce(setReducer, this);
      } else {
        return reduce(initial, setReducer, this);
      }
    }

    forEach(eachFn) {
      return forEach(item => eachFn(item, item), this);
    }
  };
