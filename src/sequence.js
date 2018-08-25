import { compose, map, concat } from 'iter-tools';
import { isIndexed, isKeyed, isSet, isConcrete } from './utils/shape';
import invariant from 'invariant';
import { reverseArrayIterator } from './utils/array';
import CollectionMixin, {
  Collection,
  registerSubtype as registerCollectionSubtype,
} from './collection-mixin';
import makeFrom from './factories/from';

const Seq = {};

export function registerSubtype(key, type) {
  Seq[key] = type;
}

class Sequence {
  constructor() {
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
}

class AbstractSequence extends CollectionMixin(Sequence) {
  constructor(iterable, collectionType) {
    iterable = iterable || [];
    super(iterable, collectionType);
    this.__iterable = iterable;
  }

  [Symbol.iterator]() {
    return this._transform()[Symbol.iterator]();
  }

  cacheResult() {
    const transformedIterable = this._transform();
    this.__iterable = isConcrete(transformedIterable)
      ? transformedIterable
      : Array.from(transformedIterable);
    this.__transforms.length = 0;
    return this;
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
    const keyed = new Seq.Keyed();
    keyed.__iterable = copy;
    return keyed;
  }

  reverse() {
    return this.__doCollectionTransform(iterable => Array.from(iterable).reverse());
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

  static get Indexed() {
    return Seq.Indexed;
  }

  static get Keyed() {
    return Seq.Keyed;
  }

  static get Set() {
    return Seq.Set;
  }
}

export default registerCollectionSubtype('Sequence', AbstractSequence);

const sequenceFrom = makeFrom(Collection, 'Sequence');

Object.defineProperty(AbstractSequence.prototype, '@@__MUTABLE_ITERABLE__@@', { value: true });
Object.defineProperty(AbstractSequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });
