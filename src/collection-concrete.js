const { ValueViewerSymbol } = require('@runkit/value-viewer');
import Collection, { Namespace as CollectionNamespace } from './collection';
import { SubtypeNamespace } from './utils/namespace';
import makeFrom from './factories/from';

export const Namespace = CollectionNamespace.__register('Concrete', new SubtypeNamespace());

const concreteFrom = makeFrom(Collection, 'Concrete');

class ConcreteCollection extends Collection {
  constructor(native, collectionSubtype) {
    super(native, 'Concrete', collectionSubtype);
    this[ValueViewerSymbol] = native;
    this.__selfParam = [this];
  }

  __doCollectionTransform(transform) {
    const CollectionConstructor = this.constructor;
    const transformed = transform(this.__native);
    if (transformed instanceof ConcreteCollection) {
      return transformed;
    } else {
      const coll = new CollectionConstructor();
      coll.__native = transformed;
      this[ValueViewerSymbol] = transformed;
      return coll;
    }
  }

  concat(...args) {
    return this.__doCollectionTransform(iterable => concat(iterable, ...args));
  }

  __doReductiveTransform(transform) {
    return transform(this.__native);
  }

  get size() {
    return this.__native.length;
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
    this[ValueViewerSymbol] = this.__native;
    return this;
  }

  __reverse() {
    const reversedSeq = CollectionNamespace.Sequence.from(this)
      .reverse()
      .cacheResult();

    this.clear();
    return reversedSeq;
  }

  sort(...args) {
    return this.sortBy(null, ...args);
  }

  sortBy(...args) {
    this.__native = this.__dynamicMethods.sort(this.__native, ...args);
    return this;
  }

  // Iterators
  keys() {
    return this.__native.keys();
  }

  values() {
    return this.__native.values();
  }

  entries() {
    return this.__native.entries();
  }

  [Symbol.iterator]() {
    return this.__native[Symbol.iterator]();
  }

  static from(initial) {
    return concreteFrom(initial);
  }
}

export default ConcreteCollection;
