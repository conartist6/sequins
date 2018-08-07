import { map } from 'iter-tools';
import { isSet, isIndexed } from '../../utils/shape';
import Sequence, { registerSubtype } from '../../sequence';
import { ConcreteCollection } from '../../mixins/collection-concrete-mixin';
import { KeyedMixin } from '../mixins';

export default class KeyedSeq extends KeyedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    // TODO List is an array subtype which passes Array.isArray but should be considered indexed not keyed
    if (isSet(iterable) || (!Array.isArray(iterable) && isIndexed(iterable))) {
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
