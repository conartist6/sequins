import { memoizeFactory } from '../utils/memoize';
import { isDataStructure } from '../utils/shape';

// Implementation borrowed from immutable
function makeToJS(Collection) {
  return function toJS(value) {
    return isDataStructure(value)
      ? Collection.Sequence.from(value)
          .map(toJS)
          .toJSON()
      : value;
  };
}

export default memoizeFactory(makeToJS);
