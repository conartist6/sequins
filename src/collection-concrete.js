import Collection, { Namespace as CollectionNamespace } from './collection';
import { SubtypeNamespace } from './utils/namespace';
import reflect from './utils/reflect';
import makeFrom from './factories/from';

export const Namespace = CollectionNamespace.__register('Concrete', new SubtypeNamespace());

const concreteFrom = makeFrom(Collection, 'Concrete');

class ConcreteCollection extends Collection {
  constructor(iterable, collectionSubtype) {
    super(iterable, 'Concrete', collectionSubtype);
    this.__selfParam = [this];
  }

  __doCollectionTransform(transform) {
    const CollectionConstructor = this.constructor;
    const transformed = transform(this.__native);
    if (transformed instanceof ConcreteCollection) {
      return transformed;
    } else {
      const coll = new CollectionConstructor();
      coll.__native = this.__constructNative(transformed);
      return coll;
    }
  }

  __constructNative(iterable) {
    const NativeConstructor = this.__native.constructor;
    return new NativeConstructor(iterable);
  }

  __doReductiveTransform(transform) {
    return transform(this.__native);
  }

  get size() {
    return this.__native.size;
  }

  get(key, defaultValue) {
    return this.has(key) ? this.__native.get(key) : defaultValue;
  }

  has(key) {
    return this.__native.has(key);
  }

  delete(key) {
    return this.__native.delete(key);
  }

  clear() {
    const NativeConstructor = this.__native.constructor;
    this.__native = new NativeConstructor();
    return this;
  }

  concat(...args) {
    return this.__doCollectionTransform(iterable => concat(iterable, ...args));
  }

  __reverse() {
    const reversedSeq = CollectionNamespace.Sequence.from(this)
      .reverse()
      .cacheResult();

    this.clear();
    return reversedSeq;
  }

  // Iterators
  keys() {
    return new CollectionNamespace.Sequence.Duplicated(this.__native.keys());
  }

  values() {
    return new CollectionNamespace.Sequence.Duplicated(this.__native.values());
  }

  entries() {
    return new CollectionNamespace.Sequence.Keyed(this.__native.entries());
  }

  [Symbol.iterator]() {
    return this.__native[Symbol.iterator]();
  }

  static from(initial) {
    return concreteFrom(initial);
  }
}

export default ConcreteCollection;
