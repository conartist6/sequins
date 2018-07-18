import { map, tap, filter, iter } from 'iter-tools';
import Sequence from './sequence';
import KeyedSeq from './sequence-keyed';
import SetSeq from './sequence-set';

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

  tap(tapFn) {
    this.__transforms.push(tap(tapFn));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(filterFn));
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

  *keys() {
    yield* map((_, i) => i, iter(this));
  }

  *values() {
    yield* this;
  }

  *entries() {
    yield* map((value, i) => [i, value], iter(this));
  }
}
