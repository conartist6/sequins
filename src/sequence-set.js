import { map, flatMap, tap, filter } from 'iter-tools';
import { isKeyed } from './utils/shape';
import forEach from './functions/for-each';
import Sequence, { registerSubtype } from './sequence';

export default class SetSeq extends Sequence {
  constructor(iterable) {
    super(iterable, 'Set');
    if (isKeyed(iterable)) {
      this.__transforms.push(iterable => iterable.values());
    }
  }

  map(mapFn) {
    this.__transforms.push(map(item => mapFn(item)));
    return this;
  }

  flatMap(mapFn) {
    return this.map(mapFn).flatten(true);
  }

  tap(tapFn) {
    this.__transforms.push(tap(item => tapFn(item)));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(item => filterFn(item)));
    return this;
  }

  filterNot(filterFn) {
    this.__transforms.push(filter(item => !filterFn(item)));
    return this;
  }

  forEach(eachFn) {
    return forEach(item => eachFn(item), this);
  }

  toSetSeq() {
    return this;
  }

  toSet() {
    return new Set(this);
  }

  toJSON() {
    return this.toArray();
  }

  *keys() {
    yield* this;
  }

  *values() {
    yield* this;
  }

  *entries() {
    yield* map(value => [value, value], this);
  }
}

registerSubtype('Set', SetSeq);
