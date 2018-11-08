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

class Sequence extends Collection {
  constructor(iterable, collectionSubtype) {
    iterable = iterable || [];
    super(iterable, 'Sequence', collectionSubtype);
    this.__iterable = iterable;
    this.__transforms = [];
    this._closed = false;
  }

  __doCollectionTransform(transform) {
    invariant(
      !this._closed,
      'This sequence has been closed. Additional collection transforms may not be added.',
    );
    this.__transforms.push(transform);
    return this;
  }

  __doReductiveTransform(transform) {
    return transform(this._transform());
  }

  _transform() {
    return this.__transforms.length
      ? compose(...reverseArrayIterator(this.__transforms))(this.__iterable)
      : this.__iterable;
  }

  _close() {
    this._closed = true;
  }

  [Symbol.iterator]() {
    return this._transform()[Symbol.iterator]();
  }

  cacheResult() {
    const transformedIterable = this._transform();
    this.__iterable = isConcreteish(transformedIterable)
      ? transformedIterable
      : Array.from(transformedIterable);
    this.__transforms.length = 0;
    return this;
  }

  set(key, newValue) {
    return this.map((value, key) => (key === key ? newValue : value));
  }

  push(key, newValue) {
    const CollectionContructor = this.constructor;
    return this.concat([newValue]);
  }

  delete(key) {
    return this.filter((_, key) => key !== key);
  }

  groupBy(grouper) {
    const CollectionContructor = this.constructor;
    // Avoid creating more unlocked sequences when doing transforms by locking the old sequence.
    this._close();
    // Even the locked sequence will still exist and shouldn't contain garbage, so make a
    // sequence which we can use as a scratch pad. It could be any sequence type, but it won't
    // really behave like one since its internal iterable will end up as a Map.
    const copy = new CollectionContructor(this);
    copy.__transforms.push(iterable => this.__dynamicMethods.groupBy(iterable, grouper));
    // Dodge the shape detection, essentially coercing our scratch sequence to be a Keyed sequence.
    const keyed = new Namespace.Keyed();
    keyed.__iterable = copy;
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
    this._close();
    return super.toIndexedSeq();
  }
  toKeyedSeq() {
    this._close();
    return super.toKeyedSeq();
  }
  toSetSeq() {
    this._close();
    return super.toSetSeq();
  }

  static from(initial) {
    return sequenceFrom(initial);
  }
}

Object.defineProperty(Sequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });

export default Sequence;
