import { map, flatMap, tap, filter } from 'iter-tools';
import forEach from './functions/for-each';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import Sequence from './sequence';
import IndexedSeq from './sequence-indexed';
import SetSeq from './sequence-set';
import makeFlatten from './factories/flatten';

const flatten = makeFlatten('Keyed');

export default class KeyedSeq extends Sequence {
  constructor(iterable) {
    super(iterable);
    if (iterable instanceof Sequence && !(iterable instanceof KeyedSeq)) {
      this.__transforms.push(iterable => iterable.entries());
    }
  }

  map(mapFn) {
    this.__transforms.push(map(([key, value]) => [key, mapFn(value, key)]));
    return this;
  }

  mapKeys(mapFn) {
    this.__transforms.push(map(([key, value]) => [mapFn(key, value), value]));
    return this;
  }

  mapEntries(mapFn) {
    this.__transforms.push(map((entry, i) => mapFn(entry, i)));
    return this;
  }

  flatMap(mapFn) {
    return this.map(mapFn).flatten(true);
  }

  flatten(shallowOrDepth) {
    this.__transforms.push(flatten(shallowOrDepth));
    return this;
  }

  tap(tapFn) {
    this.__transforms.push(tap(([key, value]) => tapFn(value, key)));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(([key, value]) => filterFn(value, key)));
    return this;
  }

  filterNot(filterFn) {
    this.__transforms.push(filter(([key, value]) => !filterFn(value, key)));
    return this;
  }

  forEach(eachFn) {
    return forEach(([key, value]) => eachFn(value, key), this);
  }

  toSetSeq() {
    return new SetSeq(this);
  }

  toKeyedSeq() {
    return this;
  }

  toIndexedSeq() {
    return new IndexedSeq(this);
  }

  toMap() {
    return new Map(this);
  }

  toObject(proto = Object.prototype) {
    const obj = Object.create(proto);
    for (const [key, value] of this) obj[key] = value;
    return obj;
  }

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
