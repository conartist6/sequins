import map from 'iter-tools/es5/map';
import entries from 'iter-tools/es5/entries';
import { isKeyed, isMutableCollection, isPlainObj } from '../../utils/shape';
import Sequence, { Namespace } from '../../collection-sequence';
import { Namespace as ConcreteCollection } from '../../collection-concrete';
import { KeyedMixin } from '..';

export default class KeyedSequence extends KeyedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    if (isMutableCollection(this.__iterable) && !isKeyed(this.__iterable)) {
      this.__constructorTransform = iterable => iterable.entries();
    } else if (isPlainObj(this.__iterable)) {
      this.__constructorTransform = obj => entries(obj);
    }
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
