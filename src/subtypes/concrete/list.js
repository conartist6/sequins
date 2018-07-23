import ConcreteCollectionMixin, { registerSubtype } from '../../mixins/collection-concrete-mixin';
import { IndexedMixin } from '../mixins';

export class List extends Array {
  constructor(iterable) {
    super();
    this.push(...iterable);
  }

  toArray() {
    return this;
  }
}

export default class SequinsList extends IndexedMixin(ConcreteCollectionMixin(List)) {}

registerSubtype('Indexed', SequinsList);
