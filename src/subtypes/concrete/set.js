import ConcreteCollectionMixin, { registerSubtype } from '../../collection-concrete-mixin';
import { SetMixin } from '..';
import { isKeyed } from '../../utils/shape';

export class TranspiledSet extends Set {}

export default class SequinsSet extends SetMixin(ConcreteCollectionMixin(TranspiledSet)) {
  constructor(iterable) {
    super(iterable && isKeyed(iterable) ? iterable.values() : iterable);
  }

  reverse() {
    const reversedSeq = this.toSetSeq()
      .reverse()
      .cacheResult();
    this.clear();
    for (const value of reversedSeq) {
      this.add(value);
    }
    return this;
  }

  toSet() {
    return this;
  }
}

registerSubtype('Set', SequinsSet);
