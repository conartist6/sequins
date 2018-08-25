import NativeCollectionMixin, { registerSubtype } from '../../collection-native-mixin';
import { SetMixin } from '..';
import { isKeyed } from '../../utils/shape';

export class TranspiledSet extends Set {}

export default class SequinsSet extends SetMixin(NativeCollectionMixin(TranspiledSet)) {
  constructor(iterable) {
    super(iterable && isKeyed(iterable) ? iterable.values() : iterable);
  }

  toSet() {
    return this;
  }
}

registerSubtype('Set', SequinsSet);
