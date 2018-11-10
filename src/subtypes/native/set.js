import { NativeCollectionMixin, Namespace } from '../../collection-native';
import { IdentityMixin } from '..';
import { isKeyed } from '../../utils/shape';

export class TranspiledSet extends Set {}

export default class SequinsSet extends IdentityMixin(NativeCollectionMixin(TranspiledSet)) {
  constructor(iterable) {
    super(iterable && isKeyed(iterable) ? iterable.values() : iterable);
  }

  toSet() {
    return this;
  }
}

Namespace.__register('Set', SequinsSet);
