import { memoizeFactory } from '../utils/memoize';

function makePush(_, collectionSubtype, collectionType) {
  if (collectionType === 'Indexed') {
    return (collection, _, value) => collection.push(value);
  } else if (collectionType === 'Keyed') {
    return (collection, key, value) => collection.set(key, value);
  } else {
    return (collection, _, value) => collection.add(value);
  }
}

export default memoizeFactory(makePush);
