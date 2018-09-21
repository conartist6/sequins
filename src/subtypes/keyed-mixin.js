import tap from 'iter-tools/es5/tap';
import map from 'iter-tools/es5/map';
import filter from 'iter-tools/es5/filter';
import forEach from '../functions/for-each';

export default Base => {
  class KeyedCollection extends Base {
    constructor(iterable) {
      super(iterable, 'Keyed');
    }

    // Collection functions
    tap(tapFn) {
      return this.__doCollectionTransform(
        tap(([key, value]) => tapFn(value, key, ...this.__selfParam)),
      );
    }

    map(mapFn) {
      return this.__doCollectionTransform(
        map(([key, value]) => [key, mapFn(value, key, ...this.__selfParam)]),
      );
    }

    mapKeys(mapFn) {
      return this.__doCollectionTransform(
        map(([key, value]) => [mapFn(key, value, ...this.__selfParam), value]),
      );
    }

    mapEntries(mapFn) {
      return this.__doCollectionTransform(map((entry, i) => mapFn(entry, i, ...this.__selfParam)));
    }

    filter(filterFn) {
      return this.__doCollectionTransform(
        filter(([key, value]) => filterFn(value, key, ...this.__selfParam)),
      );
    }

    filterNot(filterFn) {
      return this.__doCollectionTransform(
        filter(([key, value]) => !filterFn(value, key, ...this.__selfParam)),
      );
    }

    // Reductive functions
    forEach(eachFn) {
      return forEach(([key, value]) => eachFn(value, key, ...this.__selfParam), this);
    }

    // Conversions
    toObject(proto = Object.prototype) {
      const obj = Object.create(proto);
      for (const [key, value] of this) obj[key] = value;
      return obj;
    }

    toJSON() {
      return this.toObject();
    }
  }

  Object.defineProperty(KeyedCollection.prototype, '@@__MUTABLE_KEYED__@@', { value: true });

  return KeyedCollection;
};
