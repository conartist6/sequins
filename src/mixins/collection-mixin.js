import { keys, concat } from 'iter-tools';
import * as factories from '../factories';

const Subtypes = {};

export function registerSubtype(key, type) {
  Subtypes[key] = type;
}

export default Base =>
  class extends Base {
    constructor(iterable, reflectionKey) {
      super(iterable, reflectionKey); // HERE!!!!

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

    // Deep conversions
    toJS() {
      return this.__dynamicMethods.toJS(this);
    }
    toNative() {
      return this.__dynamicMethods.toNative(this);
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
  };
