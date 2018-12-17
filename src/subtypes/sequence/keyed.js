import map from 'iter-tools/es5/map';
import tap from 'iter-tools/es5/tap';
import entries from 'iter-tools/es5/entries';
import { isKeyed, isMutableCollection, isPlainObj } from '../../utils/shape';
import Sequence, { Namespace } from '../../collection-sequence';
import { Namespace as ConcreteCollection } from '../../collection-concrete';
import { KeyedMixin } from '..';

export default class KeyedSequence extends KeyedMixin(Sequence) {
  constructor(iterable) {
    if (iterable) {
      if (isMutableCollection(iterable) && !isKeyed(iterable)) {
        iterable = iterable.entries();
      } else if (isPlainObj(iterable)) {
        iterable = entries(iterable);
      }
    }
    super(iterable);
  }

  // Collection functions
  tap(tapFn) {
    return this.__doCollectionTransform(
      tap(([key, value]) => tapFn(value, key, ...this.__selfParam)),
    );
  }

  // Conversions
  toKeyedSeq() {
    return this;
  }

  toMap() {
    const Map = ConcreteCollection.Keyed;
    return new Map(this);
  }

  // Iterators
  keys() {
    return new Namespace.Duplicated(map(([key, _]) => key, this));
  }

  values() {
    return new Namespace.Duplicated(map(([_, value]) => value, this));
  }

  entries() {
    return new Namespace.Duplicated(map(_ => _, this));
  }

  [Symbol.species]() {
    return KeyedSequence;
  }
}

Namespace.__register('Keyed', KeyedSequence);
