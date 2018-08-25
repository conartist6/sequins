import CollectionMixin, { registerSubtype as registerCollectionSubtype } from './collection-mixin';
import makeFrom from './factories/from';

const Native = {};

export function registerSubtype(key, type) {
  return (Native[key] = type);
}

const statics = {
  from(initial) {
    return nativeFrom(initial);
  },

  get Indexed() {
    throw new Error('There is no native indexed type in Sequins.');
  },
  get Keyed() {
    return Native.Keyed;
  },
  get Set() {
    return Native.Set;
  },
};

registerCollectionSubtype('Native', Native);

export const NativeCollection = statics;

const nativeFrom = makeFrom(statics);

export default Base =>
  class NativeCollectionMixin extends CollectionMixin(Base) {
    __doCollectionTransform(transform) {
      const CollectionConstructor = this.constructor;
      const transformed = transform(this);
      return transformed instanceof NativeCollectionMixin
        ? transformed
        : new CollectionConstructor(transformed);
    }

    __doReductiveTransform(transform) {
      return transform(this);
    }

    groupBy(grouper) {
      return this.__dynamicMethods.groupBy(this, grouper);
    }

    toArray() {
      return this.toIndexedSeq().toArray();
    }
    toObject() {
      return this.toKeyedSeq().toObject();
    }
    toMap() {
      return this.toKeyedSeq().toMap();
    }
    toSet() {
      return this.toSetSeq().toSet();
    }
    toSeq() {}
  };
