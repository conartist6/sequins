import { map } from 'iter-tools';
import { isKeyed } from '../../utils/shape';
import Sequence, { registerSubtype } from '../../sequence';
import { ConcreteCollection } from '../../collection-concrete-mixin';
import { IndexedMixin } from '..';

export default class IndexedSeq extends IndexedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    if (isKeyed(this.__iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  // Conversions
  toIndexedSeq() {
    return this;
  }

  toList() {
    const List = ConcreteCollection.Indexed;
    return new List(this);
  }

  toArray() {
    return Array.from(this);
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

registerSubtype('Indexed', IndexedSeq);
