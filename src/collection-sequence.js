import compose from 'iter-tools/es5/compose';
import { isConcreteish } from './utils/shape';
import invariant from 'invariant';
import { reverseArrayIterator } from './utils/array';
import { SubtypeNamespace } from './utils/namespace';
import Collection, { Namespace as CollectionNamespace } from './collection';
import makeFrom from './factories/from';

class SequenceNamespace extends SubtypeNamespace {
  from(initial) {
    return sequenceFrom(initial);
  }
}

export const Namespace = CollectionNamespace.__register('Sequence', new SequenceNamespace());

const sequenceFrom = makeFrom(CollectionNamespace, 'Sequence');

const identityFn = _ => _;

class Sequence extends Collection {
  static from(initial) {
    return sequenceFrom(initial);
  }

  constructor(iterable, collectionSubtype) {
    iterable = iterable || [];
    super(iterable, 'Sequence', collectionSubtype);
    this.__iterable = iterable;
    this.__transform = null;
    this.__constructorTransform = null;
  }

  __doCollectionTransform(transform) {
    const Sequence = this[Symbol.species]();
    const result = new Sequence(this);
    result.__transform = transform;

    return result;
  }

  __doReductiveTransform(transform) {
    return transform(this._transform());
  }

  _transform() {
    const constructorTransform = this.__constructorTransform || identityFn;
    const transform = this.__transform || identityFn;

    return transform(constructorTransform(this.__iterable));
  }

  [Symbol.iterator]() {
    return this._transform()[Symbol.iterator]();
  }

  set(key, newValue) {
    return this.map((value, key) => (key === key ? newValue : value));
  }

  push(key, newValue) {
    return this.concat([newValue]);
  }

  delete(key) {
    return this.filter((_, key) => key !== key);
  }

  groupBy(grouper) {
    const concrete = this.toConcrete();
    const keyed = new Namespace.Keyed(concrete);
    keyed.__transform = () => this.__dynamicMethods.groupBy(concrete, grouper);

    return keyed;
  }

  reverse() {
    return this.__doCollectionTransform(iterable => Array.from(iterable).reverse());
  }

  sortBy(...args) {
    return this.__doCollectionTransform(iterable =>
      this.__dynamicMethods.sort(false, iterable, ...args),
    );
  }

  // Shallow conversions
  toIndexedSeq() {
    return super.toIndexedSeq();
  }
  toKeyedSeq() {
    return super.toKeyedSeq();
  }
  toSetSeq() {
    return super.toSetSeq();
  }
}

Object.defineProperty(Sequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });

export default Sequence;
