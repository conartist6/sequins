import { keys, concat, slice } from 'iter-tools';
import { RootNamespace } from './utils/namespace';
import * as factories from './factories';
import reflect from './utils/reflect';

export const Namespace = new RootNamespace();
const Collection = Namespace;

const emptyArray = [];

export const CollectionMixin = Base => {
  class CollectionMixin extends Base {
    constructor(iterable, collectionType, collectionSubtype) {
      super(iterable, collectionSubtype);
      this.__selfParam = emptyArray;

      this.__dynamicMethods = {};
      for (const name of keys(factories)) {
        this.__dynamicMethods[name] = factories[name](
          Collection,
          collectionType,
          collectionSubtype,
        );
      }
    }

    flatten(shallowOrDepth) {
      return this.__doCollectionTransform(this.__dynamicMethods.flatten(shallowOrDepth));
    }

    concat(...args) {
      return this.__doCollectionTransform(iterable => concat(iterable, ...args));
    }

    slice(start = 0, end = Infinity) {
      return this.__doCollectionTransform(iterable => slice({ start, end }, iterable));
    }

    flatMap(mapFn) {
      return this.map(mapFn).flatten(true);
    }

    groupBy(grouper) {
      return this.__doCollectionTransform(iterable =>
        this.__dynamicMethods.groupBy(iterable, grouper),
      );
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

    reduceRight(...args) {
      return this.toSeq()
        .reverse()
        .reduce(...args)
        .reverse();
    }

    // Deep conversions
    toJS() {
      return this.__dynamicMethods.toJS(this);
    }

    // Shallow conversions
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

  Object.defineProperty(CollectionMixin.prototype, '@@__MUTABLE_ITERABLE__@@', {
    value: true,
  });

  return CollectionMixin;
};

export default CollectionMixin(class SequinsBase {});
