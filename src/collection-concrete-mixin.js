import CollectionMixin, { registerSubtype as registerCollectionSubtype } from './collection-mixin';
import makeFrom from './factories/from';

const Concrete = {};

export function registerSubtype(key, type) {
  Concrete[key] = type;
}

const statics = {
  from(initial) {
    return concreteFrom(initial);
  },

  get Indexed() {
    return Concrete.Indexed;
  },
  get Keyed() {
    return Concrete.Keyed;
  },
  get Set() {
    return Concrete.Set;
  },
};

registerCollectionSubtype('Concrete', Concrete);

export const ConcreteCollection = statics;

const concreteFrom = makeFrom(statics);

export default Base =>
  class ConcreteCollectionMixin extends CollectionMixin(Base) {
    __doCollectionTransform(transform) {
      const CollectionConstructor = this.constructor;
      const transformed = transform(this);
      return transformed instanceof ConcreteCollectionMixin
        ? transformed
        : new CollectionConstructor(transformed);
    }

    __doReductiveTransform(transform) {
      return transform(this);
    }

    __getStatics() {
      return statics;
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
