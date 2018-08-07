import ConcreteCollectionMixin, { registerSubtype } from '../../collection-concrete-mixin';
import { KeyedMixin } from '..';

export class TranspiledMap extends Map {}

export default class SeqinsMap extends KeyedMixin(ConcreteCollectionMixin(TranspiledMap)) {
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

registerSubtype('Keyed', SeqinsMap);
