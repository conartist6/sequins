import { map, flatMap, tap, filter, iter } from 'iter-tools';
// Import order is always Sequnce, Indexed, Keyed, Set to avoid circular dep breakdown
import Sequence from './sequence';
import IndexedSeq from './sequence-indexed';
import SetSeq from './sequence-set';
import makeFlatten from './factories/flatten';

const flatten = makeFlatten('Keyed');

export default class KeyedSeq extends Sequence {
  constructor(iterable) {
    super(iterable);
    if (iterable instanceof Sequence && !(iterable instanceof KeyedSeq)) {
      this.__transforms.push(iterable => iterable.entries());
    }
  }

  map(mapFn) {
    this.__transforms.push(map(([key, value]) => [key, mapFn(value, key)]));
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
    this.__transforms.push(tap(([key, value]) => tapFn(value, key)));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(([key, value]) => filterFn(value, key)));
    return this;
  }

  filterNot(filterFn) {
    this.__transforms.push(filter(([key, value]) => !filterFn(value, key)));
    return this;
  }

  toSetSeq() {
    return new SetSeq(this);
  }

  toKeyedSeq() {
    return this;
  }

  toIndexedSeq() {
    return new IndexedSeq(this);
  }

  *keys() {
    yield* map(([key, _]) => key, iter(this));
  }

  *values() {
    yield* map(([_, value]) => value, iter(this));
  }

  *entries() {
    yield* this;
  }
}
