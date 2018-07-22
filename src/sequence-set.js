import { map, flatMap, tap, filter, reduce } from 'iter-tools';
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

  // Sequence methods
  map(mapFn) {
    this.__transforms.push(map(item => mapFn(item, item)));
    return this;
  }

  flatMap(mapFn) {
    return this.map(mapFn).flatten(true);
  }

  tap(tapFn) {
    this.__transforms.push(tap(item => tapFn(item, item)));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(item => filterFn(item, item)));
    return this;
  }

  filterNot(filterFn) {
    this.__transforms.push(filter(item => !filterFn(item, item)));
    return this;
  }

  // Eager functions
  reduce(reducer, initial) {
    const setReducer = (acc, item) => reducer(acc, item, item);
    if (arguments.length === 1) {
      return reduce(setReducer, this);
    } else {
      return reduce(initial, setReducer, this);
    }
  }

  forEach(eachFn) {
    return forEach(item => eachFn(item, item), this);
  }

  // Conversions
  toSetSeq() {
    return this;
  }

  toSet() {
    return new Set(this);
  }

  toJSON() {
    return this.toArray();
  }

  // Iterators
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
