import { keys, concat, slice } from 'iter-tools';
import * as factories from './factories';
import reflect from './reflect';
import invariant from 'invariant';

export const Collection = {};

export function registerSubtype(key, type) {
  Collection[key] = type;
}

export default Base => {
  class CollectionMixin extends Base {
    constructor(iterable, reflectionKey) {
      super(iterable, reflectionKey);

      invariant(
        reflectionKey,
        'new CollectionMixin must be passed a reflectionKey. Received %s',
        reflectionKey,
      );

      const collectionSubtype = Base.name === 'Sequence' ? Base.name : 'Concrete';

      this.__dynamicMethods = {};
      for (const name of keys(factories)) {
        this.__dynamicMethods[name] = factories[name](Collection, collectionSubtype, reflectionKey);
      }
    }

    static get Sequence() {
      return Collection.Sequence;
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

  // For native arrays, use native array methods.
  for (const method of ['concat', 'slice']) {
    if (Base.prototype[method]) {
      CollectionMixin.prototype[method] = Base.prototype[method];
    }
  }

  Object.defineProperty(CollectionMixin.prototype, '@@__MUTABLE_ITERABLE__@@', { value: true });

  return CollectionMixin;
};
