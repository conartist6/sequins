import NativeCollectionMixin, { registerSubtype } from '../../collection-native-mixin';
import { KeyedMixin } from '..';
import { isSet, isIndexed } from '../../utils/shape';

export class TranspiledMap extends Map {}

export default class SequinsMap extends KeyedMixin(NativeCollectionMixin(TranspiledMap)) {
  constructor(iterable) {
    super(
      iterable && !Array.isArray(iterable) && (isSet(iterable) || isIndexed(iterable))
        ? iterable.entries()
        : iterable,
    );
  }

  toMap() {
    return this;
  }
}

registerSubtype('Keyed', SequinsMap);
