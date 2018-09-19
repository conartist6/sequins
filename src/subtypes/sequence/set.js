import { map } from 'iter-tools';
import { isKeyed } from '../../utils/shape';
import Sequence, { Namespace } from '../../collection-sequence';
import { Namespace as ConcreteCollection } from '../../collection-concrete';
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

  static of(...values) {
    return new SetSeq(values);
  }
}

Namespace.__register('Set', SetSeq);
