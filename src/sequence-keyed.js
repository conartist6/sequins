import { map, tap, filter, iter } from 'iter-tools';
import Sequence from './sequence';
import IndexedSeq from './sequence-indexed';
import SetSeq from './sequence-set';

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

  tap(tapFn) {
    this.__transforms.push(tap(([key, value]) => tapFn(value, key)));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(([key, value]) => filterFn(value, key)));
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
