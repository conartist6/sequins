import { map, flatMap, tap, filter } from 'iter-tools';
import forEach from './functions/for-each';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import Sequence from './sequence';
import IndexedSeq from './sequence-indexed';
import KeyedSeq from './sequence-keyed';

import makeFlatten from './factories/flatten';

const flatten = makeFlatten('Set');

export default class SetSeq extends Sequence {
  constructor(iterable) {
    super(iterable);
    if (iterable instanceof Sequence && !(iterable instanceof SetSeq)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  map(mapFn) {
    this.__transforms.push(map(item => mapFn(item)));
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
    this.__transforms.push(tap(item => tapFn(item)));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(item => filterFn(item)));
    return this;
  }

  filterNot(filterFn) {
    this.__transforms.push(filter(item => !filterFn(item)));
    return this;
  }

  forEach(eachFn) {
    return forEach(item => eachFn(item), this);
  }

  toSetSeq() {
    return this;
  }

  toKeyedSeq() {
    return new KeyedSeq(this);
  }

  toIndexedSeq() {
    return new IndexedSeq(this);
  }

  toSet() {
    return new Set(this);
  }

  *keys() {
    yield* this;
  }

  *values() {
    yield* this;
  }

  *entries() {
    yield* map(value => [value, value], this);
  }
}
