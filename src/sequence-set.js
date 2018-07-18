import { map, tap, filter } from 'iter-tools';
import Sequence from './sequence';

export default class SetSeq extends Sequence {
  map(mapFn) {
    this.__transforms.push(map(item => mapFn(item)));
    return this;
  }

  tap(tapFn) {
    this.__transforms.push(tap(item => tapFn(item)));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(item => filterFn(item)));
    return this;
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
