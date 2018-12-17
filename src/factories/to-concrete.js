import { memoizeFactory } from '../utils/memoize';

function makeToConcrete(Collection, collectionType, collectionSubtype) {
  const ConcreteConstructor = Collection.Concrete[collectionSubtype];

  return function toNative(value) {
    return new ConcreteConstructor(value);
  };
}

export default memoizeFactory(makeToConcrete);
