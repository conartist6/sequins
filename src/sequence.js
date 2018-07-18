import { compose, concat, map } from 'iter-tools';

export default class Sequence {
  constructor(iterable) {
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

  toSetSeq() {
    return new SetSeq(this);
  }

  toKeyedSeq() {
    return new KeyedSeq(this);
  }

  toIndexedSeq() {
    return new IndexedSeq(this);
  }
}
