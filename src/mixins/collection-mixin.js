import { keys, concat, slice } from 'iter-tools';
import * as factories from '../factories';
import reflect from '../reflect';

const Subtypes = {};

export function registerSubtype(key, type) {
  Subtypes[key] = type;
}

export default Base => {
  class CollectionMixin extends Base {
    constructor(iterable, reflectionKey) {
      super(iterable, reflectionKey);

      this.__dynamicMethods = {};
      for (const name of keys(factories)) {
        this.__dynamicMethods[name] = factories[name](this.__getStatics(), reflectionKey);
      }
    }

    static get Sequence() {
      return Subtypes.Sequence;
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
      return new Subtypes.Sequence.Indexed(this);
    }
    toKeyedSeq() {
      return new Subtypes.Sequence.Keyed(this);
    }
    toSetSeq() {
      return new Subtypes.Sequence.Set(this);
    }

    keySeq() {
      return new Subtypes.Sequence.Indexed(this.keys());
    }
    valueSeq() {
      return new Subtypes.Sequence.Indexed(this.values());
    }
    entrySeq() {
      return new Subtypes.Sequence.Indexed(this.entries());
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
