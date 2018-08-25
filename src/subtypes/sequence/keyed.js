import { map } from 'iter-tools';
import { isKeyed } from '../../utils/shape';
import Sequence, { registerSubtype } from '../../sequence';
import ConcreteCollection from '../../collection-concrete';
import { KeyedMixin } from '..';

export default class KeyedSeq extends KeyedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    iterable = this.__iterable;
    if (!isKeyed(iterable) && !Array.isArray(iterable) && iterable.entries) {
      this.__transforms.push(iterable => iterable.entries());
    }
  }

  // Conversions
  toKeyedSeq() {
    return this;
  }

  toMap() {
    const Map = ConcreteCollection.Keyed;
    return new Map(this);
  }

  // Iterators
  *keys() {
    yield* map(([key, _]) => key, this);
  }

  *values() {
    yield* map(([_, value]) => value, this);
  }

  *entries() {
    yield* this;
  }
}

registerSubtype('Keyed', KeyedSeq);
