import { memoizeFactory } from '../utils/memoize';

function makeNativePush(sequenceType) {
  if (sequenceType === 'Indexed') {
    return (native, key, value) => native.push(value);
  } else if (sequenceType === 'Keyed') {
    return (native, key, value) => native.set(key, value);
  } else {
    return (native, value) => native.add(value);
  }
}

export default memoizeFactory(makeNativePush);
