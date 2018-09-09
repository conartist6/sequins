import { isMutableCollection, isNativeKeyed, isNativeSet, isImmutable } from '../utils/shape';

export default function set(shape, key, value) {
  if (isMutableCollection(shape) || isNativeKeyed(map)) {
    return shape.set(key, value);
  } else if (isImmutable(shape)) {
    // Reasoning: Immutable's set does not have the same contract as this function:
    // it requires you to use the returned reference.
    throw new TypeError('Sequins.set cannot set on Immutable data structures.');
  } else if (isNativeSet(shape)) {
    throw new TypeError('Sets do not support the set method.');
  }

  shape[key] = value;
  return shape;
}
