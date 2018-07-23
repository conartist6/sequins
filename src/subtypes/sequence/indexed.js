import { map } from 'iter-tools';
import { isKeyed } from '../../utils/shape';
import Sequence, { registerSubtype } from '../../sequence';
import { IndexedMixin } from '../mixins';

export default class IndexedSeq extends IndexedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    if (isKeyed(iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
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
