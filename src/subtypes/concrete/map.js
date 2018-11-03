import entries from 'iter-tools/es5/entries';
import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { KeyedMixin } from '..';
import { isKeyed, isMutableKeyed, isPlainObj } from '../../utils/shape';

class SequinsMap extends KeyedMixin(ConcreteCollection) {
  constructor(iterable) {
    const native = new Map(
      iterable == null
        ? []
        : !isKeyed(iterable) && !Array.isArray(iterable)
          ? isPlainObj
            ? entries(iterable)
            : iterable.entries()
          : iterable,
    );
    super(native);
    this.__native = native;
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

  static isMap(shape) {
    return isMutableKeyed(shape);
  }
}

export default Namespace.__register('Keyed', SequinsMap);
