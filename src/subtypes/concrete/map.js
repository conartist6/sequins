import ConcreteCollectionMixin, { registerSubtype } from '../../collection-concrete-mixin';
import { KeyedMixin } from '..';
import { isSet, isIndexed } from '../../utils/shape';

export class TranspiledMap extends Map {}

export default class SequinsMap extends KeyedMixin(ConcreteCollectionMixin(TranspiledMap)) {
  constructor(iterable) {
    super(
      iterable && !Array.isArray(iterable) && (isSet(iterable) || isIndexed(iterable))
        ? iterable.entries()
        : iterable,
    );
  }

  reverse() {
    const reversedSeq = this.toKeyedSeq().reverse();
    this.clear();
    for (const [key, value] of reversedSeq) {
      this.set(key, value);
    }
    return this;
  }

  toMap() {
    return this;
  }
}

registerSubtype('Keyed', SequinsMap);
