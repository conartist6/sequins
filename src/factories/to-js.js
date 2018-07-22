import Sequence from '../sequence';
import { memoizeFactory } from '../utils/memoize';
import { isDataStructure } from '../utils/shape';

// Implementation borrowed from immutable
function makeToJS() {
  return function toJS(value) {
    return isDataStructure(value)
      ? Sequence.from(value)
          .map(toJS)
          .toJSON()
      : value;
  };
}

export default memoizeFactory(makeToJS);
