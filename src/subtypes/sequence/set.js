import { map } from 'iter-tools';
import { isKeyed } from '../../utils/shape';
import Sequence, { registerSubtype } from '../../sequence';
import { ConcreteCollection } from '../../collection-concrete-mixin';
import { SetMixin } from '..';

export default class SetSeq extends SetMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    if (isKeyed(this.__iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  // Conversions
  toSetSeq() {
    return this;
  }

  toSet() {
    const Set = ConcreteCollection.Set;
    return new Set(this);
  }

  // Iterators
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

registerSubtype('Set', SetSeq);
