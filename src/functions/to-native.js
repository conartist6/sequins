import { isDataStructure } from './utils/shape';
import Seq from '../seq-factory';

export function toNative(value) {
  return isDataStructure(value)
    ? Seq(value)
        .map(toNative)
        .toNative()
    : value;
}
