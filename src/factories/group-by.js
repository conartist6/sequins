import { memoizeFactory } from '../utils/memoize';
import reflect from '../utils/reflect';
import makePush from './push';
import makeReduce from './reduce';

function makeGroupBy(Collection, collectionType, collectionSubtype) {
  const concreteType = collectionType === 'Sequence' ? 'Concrete' : collectionType;
  const CollectionConstructor = Collection[collectionType][collectionSubtype];
  const ConcreteCollectionConstructor = Collection[concreteType][collectionSubtype];
  const Map = Collection.Concrete.Keyed;

  const push = makePush(...arguments);
  const reduce = makeReduce(...arguments);

  return function groupBy(collection, grouper) {
    const map = reduce(
      collection,
      function(result, value, key) {
        const groupKey = grouper(value, key);
        if (!result.get(groupKey)) {
          const concrete = new ConcreteCollectionConstructor();
          result.set(groupKey, concrete);
        }
        push(result.get(groupKey), key, value);
        return result;
      },
      new Map(),
    );
    for (const key of map.keys()) {
      map.set(key, new CollectionConstructor(map.get(key)));
    }
    return map;
  };
}

export default memoizeFactory(makeGroupBy);
