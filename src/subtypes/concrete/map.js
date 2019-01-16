import entries from 'iter-tools/es5/entries';
import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { KeyedMixin } from '..';
import { isNative, isCollection, isMutableMap, isPlainObj } from '../../utils/shape';

class SequinsMap extends KeyedMixin(ConcreteCollection) {
  static isMap(shape) {
    return isMutableMap(shape);
  }

  constructor(iterable) {
    super(iterable);
    // prettier-ignore
    this.__native = new Map(
      iterable == null
        ? []
        : isCollection(iterable) || isNative(iterable)
          ? iterable.entries()
          : isPlainObj(iterable)
            ? entries(iterable)
            : iterable,
    );
  }

  set(key, value) {
    this.__native.set(key, value);
    return this;
  }

  sortBy(...args) {
    this.__native = new Map(this.__dynamicMethods.sort(true, Array.from(this.__native), ...args));
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

  [Symbol.species]() {
    return SequinsMap;
  }
}

export default Namespace.__register('Keyed', SequinsMap);
