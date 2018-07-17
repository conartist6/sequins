import { map, filter } from 'iter-tools';
import Sequence from './sequence';

export default class SetSeq extends Sequence {
  map(mapFn) {
    this.__transforms.push(map(item => mapFn(item)));
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
