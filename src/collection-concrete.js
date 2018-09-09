import CollectionMixin, {
  Collection,
  registerSubtype as registerCollectionSubtype,
} from './collection-mixin';
import makeFrom from './factories/from';

const Concrete = {};

export function registerSubtype(key, type) {
  return (Concrete[key] = type);
}

class Base {}

class ConcreteCollection extends CollectionMixin(Base) {
  constructor(iterable, collectionType) {
    super(iterable, collectionType);
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
    return this;
  }

  __reverse() {
    const reversedSeq = Collection.Sequence.from(this)
      .reverse()
      .cacheResult();

    this.clear();
    return reversedSeq;
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

  static get Indexed() {
    return Concrete.Indexed;
  }
  static get Keyed() {
    return Concrete.Keyed;
  }
  static get Set() {
    return Concrete.Set;
  }
}

Object.defineProperty(ConcreteCollection.prototype, '@@__MUTABLE_ITERABLE__@@', {
  value: true,
});

const concreteFrom = makeFrom(ConcreteCollection);

export default registerCollectionSubtype('Concrete', ConcreteCollection);
