import { CollectionMixin, Namespace as Collection } from './collection';
import { SubtypeNamespace } from './utils/namespace';
import makeFrom from './factories/from';

class NativeNamespace extends SubtypeNamespace {
  get Indexed() {
    throw new Error('There is no native indexed type in Sequins.');
  }
}

export const Namespace = Collection.__register('Native', new NativeNamespace());

export const statics = {
  from: makeFrom(Collection, 'Native'),
};

export const NativeCollectionMixin = Base =>
  class NativeCollectionMixin extends CollectionMixin(Base) {
    constructor(iterable, collectionSubtype) {
      super(iterable, 'Native', collectionSubtype);
    }

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
