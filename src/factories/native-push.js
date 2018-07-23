import { memoizeFactory } from '../utils/memoize';

function makeNativePush(_, collectionType) {
  if (collectionType === 'Indexed') {
    return (native, key, value) => native.push(value);
  } else if (collectionType === 'Keyed') {
    return (native, key, value) => native.set(key, value);
  } else {
    return (native, value) => native.add(value);
  }
}

export default memoizeFactory(makeNativePush);
