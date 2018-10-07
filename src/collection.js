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
    toIndexedSeq() {
      return new Collection.Sequence.Indexed(this);
    }
    toKeyedSeq() {
      return new Collection.Sequence.Keyed(this);
    }
    toSetSeq() {
      return new Collection.Sequence.Set(this);
    }

    keySeq() {
      return new Collection.Sequence.Indexed(this.keys());
    }
    valueSeq() {
      return new Collection.Sequence.Indexed(this.values());
    }
    entrySeq() {
      return new Collection.Sequence.Indexed(this.entries());
    }

    toList() {
      return this.toIndexedSeq().toList();
    }
    toArray() {
      return this.toIndexedSeq().toArray();
    }
    toObject() {
      return this.toKeyedSeq().toObject();
    }
    toMap() {
      return this.toKeyedSeq().toMap();
    }
    toSet() {
      return this.toSetSeq().toSet();
    }
  }

  Object.defineProperty(CollectionMixin.prototype, '@@__MUTABLE_COLLECTION__@@', {
    value: true,
  });

  return CollectionMixin;
};

export default CollectionMixin(class SequinsBase {});
