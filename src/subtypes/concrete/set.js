import { range } from 'iter-tools';
import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { SetMixin } from '..';
import { isKeyed } from '../../utils/shape';

class SequinsSet extends SetMixin(ConcreteCollection) {
  constructor(iterable) {
    super(iterable);
    this.__native = new Set(
      iterable == null ? [] : isKeyed(iterable) ? iterable.values() : iterable,
    );
  }

  add(key, value) {
    this.__native.add(key, value);
    return this;
  }

  reverse() {
    const reversedSeq = this.__reverse();
    for (const value of reversedSeq) {
      this.add(value);
    }
    return this;
  }

  // Conversions
  toSet() {
    return this;
  }
}

export default Namespace.__register('Set', SequinsSet);
