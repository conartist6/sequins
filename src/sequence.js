import { compose, map, concat } from 'iter-tools';
import { isIndexed, isKeyed, isSet } from './utils/shape';
import { reverseArrayIterator } from './utils/array';
import CollectionMixin, { registerSubtype as registerCollectionSubtype } from './collection-mixin';
import makeFrom from './factories/from';

const Seq = {};

export function registerSubtype(key, type) {
  Seq[key] = type;
}

class SequenceBase {
  constructor() {
    this.__transforms = [];
  }

  __getStatics() {
    return Sequence;
  }

  __doCollectionTransform(transform) {
    this.__transforms.push(transform);
    return this;
  }
}

export default class Sequence extends CollectionMixin(SequenceBase) {
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

  constructor(iterable, reflectionKey) {
    super(iterable, reflectionKey);
    this.__iterable = iterable;
  }

  *[Symbol.iterator]() {
    yield* this.__transforms.length
      ? compose(...reverseArrayIterator(this.__transforms))(this.__iterable)
      : this.__iterable;
  }

  cacheResult() {
    this.__iterable = Array.from(this);
    this.__transforms.length = 0;
    return this;
  }

  groupBy(grouper) {
    this.__iterable = this.__dynamicMethods.groupBy(this, grouper);
    this.__transforms.length = 0;
    return this;
  }

  reverse() {
    this.cacheResult();
    this.__iterable.reverse();
    return this;
  }
}

registerCollectionSubtype('Sequence', Sequence);

const sequenceFrom = makeFrom(Sequence);

Object.defineProperty(Sequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });
