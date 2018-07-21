import { compose, concat, map } from 'iter-tools';
import { isIndexed, isKeyed, isSet } from './utils/shape';
import { toJS } from './functions/to-js';

import makeFlatten from './factories/flatten';

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

  constructor(iterable, reflectionKey) {
    this.__iterable = iterable;
    this.__transforms = [];
    this._reflectionKey = reflectionKey;
  }

  *[Symbol.iterator]() {
    const transforms = [...this.__transforms].reverse();

    yield* this.__transforms.length ? compose(...transforms)(this.__iterable) : this.__iterable;
  }

  concat(...args) {
    const SequenceConstructor = this.constructor;
    this.__transforms.push(iterable => concat(iterable, ...args));
    return this;
  }

  flatten(shallowOrDepth) {
    this.__transforms.push(makeFlatten(this._reflectionKey)(shallowOrDepth));
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
    return toJS(this);
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
}

Object.defineProperty(Sequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });
