import { range } from 'iter-tools';
import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { KeyedMixin } from '..';
import { isKeyed } from '../../utils/shape';

class SequinsMap extends KeyedMixin(ConcreteCollection) {
  constructor(iterable) {
    super(iterable);
    this.__native = new Map(
      iterable == null
        ? []
        : !isKeyed(iterable) && !Array.isArray(iterable)
          ? iterable.entries()
          : iterable,
    );
  }

  set(key, value) {
    this.__native.set(key, value);
    return this;
  }

  reverse() {
    const reversedSeq = this.__reverse();
    for (const [key, value] of reversedSeq) {
      this.set(key, value);
    }
    return this;
  }

  // Conversions
  toMap() {
    return this;
  }
}

export default Namespace.__register('Keyed', SequinsMap);
