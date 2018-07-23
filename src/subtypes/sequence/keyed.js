import { map } from 'iter-tools';
import { isSet, isIndexed } from '../../utils/shape';
import Sequence, { registerSubtype } from '../../sequence';
import { KeyedMixin } from '../mixins';

export default class KeyedSeq extends KeyedMixin(Sequence) {
  constructor(iterable) {
    super(iterable);
    // TODO List is an array subtype which passes Array.isArray but should be considered indexed not keyed
    if (isSet(iterable) || (!Array.isArray(iterable) && isIndexed(iterable))) {
      this.__transforms.push(iterable => iterable.entries());
    }
  }

  // Conversions
  toKeyedSeq() {
    return this;
  }

  toMap() {
    return new Map(this);
  }

  toObject(proto = Object.prototype) {
    const obj = Object.create(proto);
    for (const [key, value] of this) obj[key] = value;
    return obj;
  }

  toJSON() {
    return this.toObject();
  }

  // Iterators
  *keys() {
    yield* map(([key, _]) => key, this);
  }

  *values() {
    yield* map(([_, value]) => value, this);
  }

  *entries() {
    yield* this;
  }
}

Object.defineProperty(KeyedSeq.prototype, '@@__MUTABLE_KEYED__@@', { value: true });
registerSubtype('Keyed', KeyedSeq);
