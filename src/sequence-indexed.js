import { map, tap, filter } from 'iter-tools';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import Sequence from './sequence';
import KeyedSeq from './sequence-keyed';
import SetSeq from './sequence-set';

import makeFlatten from './factories/flatten';

const flatten = makeFlatten('Indexed');

export default class IndexedSeq extends Sequence {
  constructor(iterable) {
    super(iterable);
    if (iterable instanceof Sequence && !(iterable instanceof SetSeq)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  map(mapFn) {
    this.__transforms.push(map(mapFn));
    return this;
  }

  flatMap(mapFn) {
    return this.map(mapFn).flatten(true);
  }

  flatten(shallowOrDepth) {
    this.__transforms.push(flatten(shallowOrDepth));
    return this;
  }

  tap(tapFn) {
    this.__transforms.push(tap(tapFn));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(filterFn));
    return this;
  }

  filterNot(filterFn) {
    this.__transforms.push(filter((item, i) => !filterFn(item, i)));
    return this;
  }

  toSetSeq() {
    return new SetSeq(this);
  }

  toKeyedSeq() {
    return new KeyedSeq(this);
  }

  toIndexedSeq() {
    return this;
  }

  toArray() {
    return Array.from(this);
  }

  *keys() {
    yield* map((_, i) => i, this);
  }

  *values() {
    yield* this;
  }

  *entries() {
    yield* map((value, i) => [i, value], this);
  }
}
