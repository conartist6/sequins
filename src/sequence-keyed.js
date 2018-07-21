import { map, flatMap, tap, filter } from 'iter-tools';
import { isSet, isIndexed } from './utils/shape';
import forEach from './functions/for-each';
import Sequence, { registerSubtype } from './sequence';

export default class KeyedSeq extends Sequence {
  constructor(iterable) {
    super(iterable, 'Keyed');

    if (isSet(iterable) || (!Array.isArray(iterable) && isIndexed(iterable))) {
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
