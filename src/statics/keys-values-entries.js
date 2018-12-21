import { Namespace as Collection } from '../collection';
import makeFrom from '../factories/from';

export function keys(shape) {
  return makeFrom(Collection, 'Sequence')(shape).keys();
}

export function values(shape) {
  return makeFrom(Collection, 'Sequence')(shape).values();
}

export function entries(shape) {
  return makeFrom(Collection, 'Sequence')(shape).entries();
}
