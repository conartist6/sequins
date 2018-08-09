import { memoizeFactory } from '../utils/memoize';
import reflect from '../reflect';
import makePush from './push';

function makeGroupBy(Collection, collectionSubtype, collectionType) {
  const TypedCollection = Collection[collectionSubtype][collectionType];
  const ConcreteCollection = Collection.Concrete[collectionType];
  const Map = Collection.Concrete.Keyed;

  const push = makePush(Collection, collectionSubtype, collectionType);

  return function groupBy(collection, grouper) {
    debugger;
    const map = collection.reduce(function(result, value, key) {
      const groupKey = grouper(value, key);
      if (!result.get(groupKey)) {
        const concrete = new ConcreteCollection();
        result.set(groupKey, concrete);
      }
      push(result.get(groupKey), key, value);
      return result;
    }, new Map());
    for (const key of map.keys()) {
      map.set(key, new TypedCollection(map.get(key)));
    }
    return map;
  };
}

export default memoizeFactory(makeGroupBy);
