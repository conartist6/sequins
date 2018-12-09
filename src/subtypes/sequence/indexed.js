import map from 'iter-tools/es5/map';
import tap from 'iter-tools/es5/tap';
import { isKeyed } from '../../utils/shape';
import Sequence, { Namespace } from '../../collection-sequence';
import { Namespace as ConcreteCollection } from '../../collection-concrete';
import { IndexedMixin } from '..';

export default class IndexedSeq extends IndexedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    if (isKeyed(this.__iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  // Collection functions
  tap(tapFn) {
    return this.__doCollectionTransform(tap((value, i) => tapFn(value, i, ...this.__selfParam)));
  }

  // Conversions
  toIndexedSeq() {
    return this;
  }

  toList() {
    const List = ConcreteCollection.Indexed;
    return new List(this);
  }

  toArray() {
    return Array.from(this);
  }

  // Iterators
  keys() {
    return new Namespace.Duplicated(map((_, i) => i, this));
  }

  values() {
    return new Namespace.Duplicated(this);
  }

  entries() {
    return new Namespace.Keyed(map((value, i) => [i, value], this));
  }

  static of(...values) {
    return new IndexedSeq(values);
  }
}

Namespace.__register('Indexed', IndexedSeq);
