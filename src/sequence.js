import { compose, concat, map } from 'iter-tools';
// Sequence must not import any of its subclasses

export default class Sequence {
  constructor(iterable, reflectionKey) {
    this.__iterable = iterable;
    this.__transforms = [];
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

Object.defineProperty(Sequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });
