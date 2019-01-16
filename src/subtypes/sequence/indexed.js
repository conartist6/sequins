import map from 'iter-tools/es5/map';
import { isKeyed } from '../../utils/shape';
import Sequence, { Namespace } from '../../collection-sequence';
import { Namespace as ConcreteCollection } from '../../collection-concrete';
import { IndexedMixin } from '..';

export default class IndexedSequence extends IndexedMixin(Sequence) {
  static of(...values) {
    return new IndexedSequence(values);
  }

  constructor(iterable) {
    super(iterable);
    if (isKeyed(this.__iterable)) {
      this.__constructorTransform = iterable => iterable.values();
    }
  }
  // Iterators
  keys() {
    return new Namespace.Duplicated(map((_, i) => i, this));
  }

  values() {
    return new Namespace.Duplicated(this);
  }

  entries() {
    return new Namespace.Duplicated(map((value, i) => [i, value], this));
  }

  [Symbol.species]() {
    return IndexedSequence;
  }
}

Namespace.__register('Indexed', IndexedSequence);
