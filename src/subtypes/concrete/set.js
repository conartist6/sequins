import map from 'iter-tools/es5/map';
import flat from 'iter-tools/es5/flat';
import { Namespace as Collection } from '../../collection';
import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { DuplicatedMixin } from '..';
import { isKeyed, isMutableSet } from '../../utils/shape';
import makeFrom from '../../factories/from';

class SequinsSet extends DuplicatedMixin(ConcreteCollection) {
  static isSet(shape) {
    return isMutableSet(shape);
  }

  static of(...values) {
    return new SequinsSet(values);
  }

  static fromKeys(shape) {
    return makeFrom(Collection, 'Sequence')(shape)
      .keys()
      .toSet();
  }

  static union(...iterables) {
    return new SequinsSet(
      flat(1, map(iterable => new Collection.Sequence.Duplicated(iterable), iterables)),
    );
  }

  static intersect(...iterables) {
    const countMap = new Namespace.Keyed();
    for (const iterable of iterables) {
      for (const value of new Collection.Sequence.Duplicated(iterable)) {
        countMap.set(value, (countMap.get(value) || 0) + 1);
      }
    }
    return new Collection.Sequence.Keyed(countMap)
      .filter(count => count === iterables.length)
      .keys()
      .toSet();
  }

  constructor(iterable) {
    super(iterable);
    this.__native = new Set(
      iterable == null ? [] : isKeyed(iterable) ? iterable.values() : iterable,
    );
  }

  add(key, value) {
    this.__native.add(key, value);
    return this;
  }

  sortBy(...args) {
    this.__native = new Set(this.__dynamicMethods.sort(true, Array.from(this.__native), ...args));
    return this;
  }

  reverse() {
    const reversedSeq = this.__reverse();
    for (const value of reversedSeq) {
      this.add(value);
    }
    return this;
  }

  union(...iterables) {
    return SequinsSet.union(this, ...iterables);
  }

  intersect(...iterables) {
    return SequinsSet.intersect(this, ...iterables);
  }

  // Conversions
  toSet() {
    return this;
  }

  [Symbol.species]() {
    return SequinsSet;
  }
}

export default Namespace.__register('Duplicated', SequinsSet);
