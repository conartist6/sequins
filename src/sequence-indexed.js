import { map, filter, iter } from 'iter-tools';
import Sequence from './sequence';

export default class IndexedSeq extends Sequence {
  map(mapFn) {
    this.__transforms.push(map(mapFn));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(filterFn));
    return this;
  }

  *keys() {
    yield* map((_, i) => i, iter(this));
  }

  *values() {
    yield* this;
  }

  *entries() {
    yield* map((value, i) => [i, value], iter(this));
  }
}
