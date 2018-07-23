import { map } from 'iter-tools';
import { isKeyed } from '../../utils/shape';
import Sequence, { registerSubtype } from '../../sequence';
import { SetMixin } from '../mixins';

export default class SetSeq extends SetMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    if (isKeyed(iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  // Conversions
  toSetSeq() {
    return this;
  }

  toSet() {
    return new Set(this);
  }

  toJSON() {
    return this.toArray();
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
