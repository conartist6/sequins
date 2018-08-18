import { compose, map, concat } from 'iter-tools';
import { isIndexed, isKeyed, isSet } from './utils/shape';
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
  }

  __getStatics() {
    return Sequence;
  }

  __doCollectionTransform(transform) {
    this.__transforms.push(transform);
    return this;
  }

  __transform() {
    return this.__transforms.length
      ? compose(...reverseArrayIterator(this.__transforms))(this.__iterable)
      : this.__iterable;
  }
}

export default class AbstractSequence extends CollectionMixin(Sequence) {
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
    iterable = iterable || [];
    super(iterable, reflectionKey);
    this.__iterable = iterable;
  }

  *[Symbol.iterator]() {
    yield* this.__transform();
  }

  cacheResult() {
    const transformedIterable = this.__transform();
    this.__iterable = Array.isArray(transformedIterable)
      ? transformedIterable
      : Array.from(transformedIterable);
    this.__transforms.length = 0;
    return this;
  }

  groupBy(grouper) {
    return new Seq.Keyed(this.__dynamicMethods.groupBy(this, grouper));
  }

  reverse() {
    return this.__doCollectionTransform(iterable => Array.from(iterable).reverse());
  }
}

registerCollectionSubtype('Sequence', AbstractSequence);

const sequenceFrom = makeFrom(Collection, 'Sequence');

Object.defineProperty(AbstractSequence.prototype, '@@__MUTABLE_SEQUENCE__@@', { value: true });
