import size from 'iter-tools/es5/size';
import filter from 'iter-tools/es5/filter';
import keys from 'iter-tools/es5/keys';
import slice from 'iter-tools/es5/slice';
import { RootNamespace } from './utils/namespace';
import * as factories from './factories';
import reflect from './utils/reflect';

export const Namespace = new RootNamespace();
const Collection = Namespace;

const emptyArray = [];

class MethodFactory {
  constructor(collectionType, collectionSubtype) {
    this._collectionType = collectionType;
    this._collectionSubtype = collectionSubtype;
  }
}

const nativeFactories = new Map([
  [Map, coll => new Map(new Collection.Sequence.Keyed(coll))],
  [Set, coll => new Set(new Collection.Sequence.Duplicated(coll))],
  [Array, coll => Array.from(new Collection.Sequence.Indexed(coll))],
  [
    Object,
    // TODO use Object.fromEntries here when it is ready.
    coll =>
      new Collection.Sequence.Keyed(coll).reduce((obj, value, key) => {
        obj[key] = value;
        return obj;
      }, {}),
  ],
]);

for (const name of keys(factories)) {
  Object.defineProperty(MethodFactory.prototype, name, {
    get() {
      return factories[name](Collection, this._collectionType, this._collectionSubtype);
    },
  });
}

export const CollectionMixin = Base => {
  class CollectionMixin extends Base {
    constructor(iterable, collectionType, collectionSubtype) {
      super(iterable, collectionSubtype);
      this.__selfParam = emptyArray;

      this.__dynamicMethods = new MethodFactory(collectionType, collectionSubtype);
    }

    slice(start = 0, end = Infinity) {
      return this.__doCollectionTransform(slice({ start, end }));
    }

    concat(...args) {
      return this.__doCollectionTransform(iterable =>
        this.__dynamicMethods.concat(iterable, ...args),
      );
    }

    flatten(...args) {
      return this.__doCollectionTransform(iterable =>
        this.__dynamicMethods.flatten(iterable, ...args),
      );
    }

    groupBy(grouper) {
      return this.__doCollectionTransform(iterable =>
        this.__dynamicMethods.groupBy(iterable, grouper),
      );
    }

    flatMap(mapFn) {
      return this.map(mapFn).flatten(true);
    }

    sort(...args) {
      return this.sortBy(null, ...args);
    }

    count(predicate) {
      return size(predicate ? this.filter(predicate) : this);
    }

    // Reductive functions
    reduce(reducer, ...args) {
      return this.__doReductiveTransform(iterable =>
        this.__dynamicMethods.reduce(
          iterable,
          (acc, value, index) => reducer(acc, value, index, ...this.__selfParam),
          ...args,
        ),
      );
    }

    // Deep conversions
    toJS() {
      return this.__dynamicMethods.toJS(this);
    }

    // Shallow conversions
    toSeq() {
      return new Collection.Sequence.from(this);
    }
    toConcrete() {
      return this.__dynamicMethods.toConcrete(this);
    }
    to(CollectionConstructor) {
      if (nativeFactories.has(CollectionConstructor)) {
        return nativeFactories.get(CollectionConstructor)(this);
      } else {
        return this instanceof CollectionConstructor ? this : new CollectionConstructor(this);
      }
    }
  }

  Object.defineProperty(CollectionMixin.prototype, '@@__MUTABLE_COLLECTION__@@', {
    value: true,
  });

  return CollectionMixin;
};

export default CollectionMixin(class SequinsBase {});
