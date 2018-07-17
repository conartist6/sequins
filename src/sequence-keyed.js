import { map, filter, iter } from 'iter-tools';
import Sequence from './sequence';

export default class KeyedSeq extends Sequence {
  map(mapFn) {
    this.__transforms.push(map(([key, value]) => [key, mapFn(value, key)]));
    return this;
  }

  filter(filterFn) {
    this.__transforms.push(filter(([key, value]) => filterFn(value, key)));
    return this;
  }

  *keys() {
    yield* map(([key, _]) => key, iter(this));
  }

  *values() {
    yield* map(([_, value]) => value, iter(this));
  }

  *entries() {
    yield* this;
  }
}
