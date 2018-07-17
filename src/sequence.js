import { compose, iter } from 'iter-tools';

export default class Sequence {
  constructor(iterable) {
    this.__iterable = iterable;
    this.__transforms = [];
  }

  *[Symbol.iterator]() {
    yield* this.__transforms.length ? compose(this.__transforms)(this.__iterable) : this.__iterable;
  }
}
