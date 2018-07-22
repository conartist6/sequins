import { map, tap, filter, reduce } from 'iter-tools';
import { isKeyed } from './utils/shape';
import forEach from './functions/for-each';
import Sequence, { registerSubtype } from './sequence';

export default class IndexedSeq extends Sequence {
  constructor(iterable) {
    super(iterable, 'Indexed');
    if (isKeyed(iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  // Sequence methods
  map(mapFn) {
    this.__transforms.push(map(mapFn));
    return this;
  }

  flatMap(mapFn) {
    return this.map(mapFn).flatten(true);
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

  // Eager functions
  reduce(reducer, initial) {
    if (arguments.length === 1) {
      return reduce(reducer, this);
    } else {
      return reduce(initial, reducer, this);
    }
  }

  forEach(eachFn) {
    return forEach(eachFn, this);
  }

  // Conversions
  toIndexedSeq() {
    return this;
  }

  toArray() {
    return Array.from(this);
  }

  toJSON() {
    return this.toArray();
  }

  // Iterators
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

Object.defineProperty(IndexedSeq.prototype, '@@__MUTABLE_INDEXED__@@', { value: true });
registerSubtype('Indexed', IndexedSeq);
