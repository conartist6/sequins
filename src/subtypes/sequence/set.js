import map from 'iter-tools/es5/map';
import tap from 'iter-tools/es5/tap';
import { isKeyed } from '../../utils/shape';
import Sequence, { Namespace } from '../../collection-sequence';
import { Namespace as ConcreteCollection } from '../../collection-concrete';
import { DuplicatedMixin } from '..';

export default class SetSeq extends DuplicatedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    if (isKeyed(this.__iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  // Collection functions
  tap(tapFn) {
    return this.__doCollectionTransform(tap(item => tapFn(item, item, ...this.__selfParam)));
  }

  // Conversions
  toSetSeq() {
    return this;
  }

  toSet() {
    const Set = ConcreteCollection.Duplicated;
    return new Set(this);
  }

  // Iterators
  keys() {
    return this;
  }

  values() {
    return this;
  }

  entries() {
    return new Namespace.Keyed(map(value => [value, value], this));
  }

  static of(...values) {
    return new SetSeq(values);
  }
}

Namespace.__register('Duplicated', SetSeq);
