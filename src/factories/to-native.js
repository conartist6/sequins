import Sequence from '../sequence';
import { memoizeFactory } from '../utils/memoize';
import { isDataStructure, reflectionKey } from '../utils/shape';
import reflect from '../reflect';

function flatNative(value) {
  return reflect[reflectionKey(value)].toNative(value);
}

function makeToNative() {
  return function toNative(value) {
    return isDataStructure(value) ? flatNative(Sequence.from(value).map(toNative)) : value;
  };
}

export default memoizeFactory(makeToNative);
