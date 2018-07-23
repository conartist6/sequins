import ConcreteCollectionMixin, { registerSubtype } from '../../mixins/collection-concrete-mixin';
import { SetMixin } from '../mixins';

export class TranspiledSet extends Set {}

export default class SequinsSet extends SetMixin(ConcreteCollectionMixin(TranspiledSet)) {
  toSet() {
    return this;
  }
}

registerSubtype('Set', SequinsSet);
