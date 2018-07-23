import ConcreteCollectionMixin, { registerSubtype } from '../../mixins/collection-concrete-mixin';
import { KeyedMixin } from '../mixins';

export class TranspiledMap extends Map {}

export default class SeqinsMap extends KeyedMixin(ConcreteCollectionMixin(TranspiledMap)) {
  toMap() {
    return this;
  }
}

registerSubtype('Keyed', SeqinsMap);
