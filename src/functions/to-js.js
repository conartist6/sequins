import { isDataStructure } from '../utils/shape';
import Sequence from '../sequence';

// Implementation borrowed from immutable
export function toJS(value) {
  return isDataStructure(value)
    ? Sequence.from(value)
        .map(toJS)
        .toJSON()
    : value;
}
