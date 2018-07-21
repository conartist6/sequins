import { isDataStructure, reflectionKey } from '../utils/shape';
import Sequence from '../sequence';
import reflect from '../reflect';

function flatNative(value) {
  return reflect[reflectionKey(value)].toNative(value);
}

export default function toNative(value) {
  return isDataStructure(value) ? flatNative(Sequence.from(value).map(toNative)) : value;
}
