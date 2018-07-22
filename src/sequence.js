import { compose, concat, map, keys, entries } from 'iter-tools';
import { isIndexed, isKeyed, isSet } from './utils/shape';
import { reverseArrayIterator } from './utils/array';
import * as factories from './factories';

const emptyArray = [];
const Seq = {};

export function registerSubtype(key, type) {
  Seq[key] = type;
}

export default class Sequence {
  static from(initial) {
    if (initial == null) {
      return new Seq.Indexed(emptyArray);
    } else if (isIndexed(initial)) {
      return new Seq.Indexed(initial);
    } else if (isKeyed(initial)) {
      return new Seq.Keyed(initial);
    } else if (isSet(initial)) {
      return new Seq.Set(initial);
    } else if (typeof initial[Symbol.iterator] === 'function') {
      return new Seq.Indexed(initial);
    } else if (typeof initial === 'object') {
      return new Seq.Keyed(entries(initial));
    }
    return null;
  }

  static get Indexed() {
    return Seq.Indexed;
  }

  static get Keyed() {
    return Seq.Keyed;
  }

  static get Set() {
    return Seq.Set;
  }

  constructor(iterable, reflectionKey) {
    this.__iterable = iterable;
    this.__transforms = [];
    this._dynamicMethods = {};
    for (const name of keys(factories)) {
      this._dynamicMethods[name] = factories[name](reflectionKey);
    }
  }

  *[Symbol.iterator]() {
    yield* this.__transforms.length
      ? compose(...reverseArrayIterator(this.__transforms))(this.__iterable)
      : this.__iterable;
  }

  cacheResult() {
    this.__iterable = Array.from(this);
    this.__transforms.length = 0;
    return this;
  }

  concat(...args) {
    const SequenceConstructor = this.constructor;
    this.__transforms.push(iterable => concat(iterable, ...args));
    return this;
  }

  flatten(shallowOrDepth) {
    this.__transforms.push(this._dynamicMethods.flatten(shallowOrDepth));
    return this;
  }

  groupBy(grouper) {
    this.__iterable = this._dynamicMethods.groupBy(this, grouper);
    this.__transforms.length = 0;
    return this;
  }

  reverse() {
    this.cacheResult();
    this.__iterable.reverse();
    return this;
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

  toJS() {
    return this._dynamicMethods.toJS(this);
  }
  toNative() {
    return this._dynamicMethods.toNative(this);
  }

  toIndexedSeq() {
    return new Seq.Indexed(this);
  }
  toKeyedSeq() {
    return new Seq.Keyed(this);
  }
  toSetSeq() {
    return new Seq.Set(this);
  }

  keySeq() {
    return new Seq.Indexed(this.keys());
  }
  valueSeq() {
    return new Seq.Indexed(this.values());
  }
  entrySeq() {
    return new Seq.Indexed(this.entries());
  }
}

Object.defineProperty(Sequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });
