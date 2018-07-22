import Sequence from '../sequence';
import { memoizeFactory } from '../utils/memoize';
import reflect from '../reflect';
import makeNativePush from './native-push';

function makeGroupBy(sequenceType) {
  const SequenceType = Sequence[sequenceType];
  const { nativeSet, nativeSize, NativeConstructor } = reflect[sequenceType];

  const nativePush = makeNativePush(sequenceType);

  return function groupBy(sequence, grouper) {
    const map = sequence.reduce(function(result, value, key) {
      key = grouper(value, key);
      if (result.has(key)) {
        nativePush(result.get(key), key, value);
      } else {
        const native = new NativeConstructor();
        nativePush(native, key, value);
        result.set(key, native);
      }
      return result;
    }, new Map());
    for (const key of map.keys()) {
      map.set(key, new SequenceType(map.get(key)));
    }
    return map;
  };
}

export default memoizeFactory(makeGroupBy);
