import ConcreteCollectionMixin, { registerSubtype } from '../../collection-concrete-mixin';
import { SetMixin } from '..';

export class TranspiledSet extends Set {}

export default class SequinsSet extends SetMixin(ConcreteCollectionMixin(TranspiledSet)) {
  reverse() {
    const reversedSeq = this.toSetSeq().reverse();
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
