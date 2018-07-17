import { compose, iter } from 'iter-tools';

export default class Sequence {
  constructor(iterable) {
    this.__iterable = iterable;
    this.__transforms = [];
  }

  *[Symbol.iterator]() {
    const transforms = [...this.__transforms].reverse();
    yield* this.__transforms.length ? compose(transforms)(this.__iterable) : this.__iterable;
  }
}
