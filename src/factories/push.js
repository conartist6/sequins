import { memoizeFactory } from '../utils/memoize';

function makePush(Collection, collectionType, collectionSubtype) {
  if (collectionSubtype === 'Indexed') {
    return (collection, _, value) => collection.push(value);
  } else if (collectionSubtype === 'Keyed') {
    return (collection, key, value) => collection.set(key, value);
  } else {
    return (collection, _, value) => collection.add(value);
  }
}

export default memoizeFactory(makePush);
