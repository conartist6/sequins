import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { DuplicatedMixin } from '..';
import { isKeyed, isMutableSet } from '../../utils/shape';

class SequinsSet extends DuplicatedMixin(ConcreteCollection) {
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

  sortBy(...args) {
    this.__native = new Set(this.__dynamicMethods.sort(true, Array.from(this.__native), ...args));
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

  static isSet(shape) {
    return isMutableSet(shape);
  }

  static of(...values) {
    return new SequinsSet(values);
  }
}

export default Namespace.__register('Duplicated', SequinsSet);
