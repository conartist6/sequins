import { isDataStructure } from '../utils/shape';
import Seq from '../seq-factory';

// Implementation borrowed from immutable
export function toJS(value) {
  return isDataStructure(value)
    ? Seq(value)
        .map(toJS)
        .toJSON()
    : value;
}
