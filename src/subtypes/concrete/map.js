import entries from 'iter-tools/es5/entries';
import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { KeyedMixin } from '..';
import { isKeyed, isMutableKeyed, isPlainObj } from '../../utils/shape';

class SequinsMap extends KeyedMixin(ConcreteCollection) {
  constructor(iterable) {
    super(iterable);
    this.__native = new Map(
      iterable == null
        ? []
        : !isKeyed(iterable) && !Array.isArray(iterable)
          ? isPlainObj
            ? entries(iterable)
            : iterable.entries()
          : iterable,
    );
  }

  set(key, value) {
    if (typeof this.__native.set != 'function') {
      console.log(this.__native.set);
      console.log(this.__native);
      console.log(this);
    }
    this.__native.set(key, value);
    return this;
  }

  sortBy(...args) {
    this.__native = new Map(this.__dynamicMethods.sort(true, Array.from(this.__native), ...args));
    console.log(this.__native);
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

  static isMap(shape) {
    return isMutableKeyed(shape);
  }
}

export default Namespace.__register('Keyed', SequinsMap);
