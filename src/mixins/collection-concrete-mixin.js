import CollectionMixin from './collection-mixin';
import makeFrom from '../factories/from';

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

export const ConcreteCollection = statics;

const concreteFrom = makeFrom(statics);

export default Base =>
  class extends CollectionMixin(Base) {
    __doCollectionTransform(transform) {
      const CollectionConstructor = this.constructor;
      return new CollectionConstructor(transform(this));
    }

    __getStatics() {
      return statics;
    }

    groupBy(grouper) {
      return this.__dynamicMethods.groupBy(this, grouper);
    }

    reverse() {
      return this.toSeq()
        .reverse()
        .toMap();
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
