import map from 'iter-tools/es5/map';
import tap from 'iter-tools/es5/tap';
import { isKeyed } from '../../utils/shape';
import Sequence, { Namespace } from '../../collection-sequence';
import { Namespace as ConcreteCollection } from '../../collection-concrete';
import { DuplicatedMixin } from '..';

export default class SetSequence extends DuplicatedMixin(Sequence) {
  static of(...values) {
    return new SetSequence(values);
  }

  constructor(iterable) {
    if (isKeyed(iterable)) {
      iterable = iterable.values();
    }
    super(iterable);
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
    return new Namespace.Duplicated(map(value => [value, value], this));
  }

  [Symbol.species]() {
    return SetSequence;
  }
}

Namespace.__register('Duplicated', SetSequence);
