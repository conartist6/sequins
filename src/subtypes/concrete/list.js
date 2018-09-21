import range from 'iter-tools/es5/range';
import ConcreteCollection, { Namespace } from '../../collection-concrete';
import { IndexedMixin } from '..';
import { isKeyed } from '../../utils/shape';

class List extends IndexedMixin(ConcreteCollection) {
  constructor(iterable) {
    super(iterable);
    this.__native =
      iterable == null ? [] : Array.from(isKeyed(iterable) ? iterable.values() : iterable);
  }

  get(idx) {
    return this.__native[idx];
  }
  set(idx, value) {
    this.__native[idx] = value;
    return this;
  }
  has(idx) {
    return idx < this.__native.length;
  }
  push(...values) {
    this.__native.push(...values);
    return this;
  }
  pop() {
    return this.__native.pop();
  }
  shift() {
    return this.__native.shift();
  }
  unshift(value) {
    this.__native.unshift(value);
    return this;
  }
  first() {
    return this.__native[0];
  }
  last() {
    return this.__native[this.__native.length];
  }

  fill(...args) {
    this.__native.fill(...args);
    return this;
  }
  includes(value) {
    return this.__native.includes(value);
  }
  map(mapFn) {
    return this.__doCollectionTransform(() =>
      this.__native.map((value, index) => mapFn(value, index, this)),
    );
  }
  filter(filterFn) {
    return this.__doCollectionTransform(() =>
      this.__native.filter((value, index) => filterFn(value, index, this)),
    );
  }
  filterNot(filterFn) {
    return this.__doCollectionTransform(() =>
      this.__native.filter((value, index) => !filterFn(value, index, this)),
    );
  }
  slice(...args) {
    return this.__doCollectionTransform(() => this.__native.slice(...args));
  }
  concat(...args) {
    return this.__doCollectionTransform(() => this.__native.concat(...args));
  }
  reverse() {
    this.__native.reverse();
    return this;
  }
  reduce(reducer, ...args) {
    return this.__native.reduce((acc, value, index) => reducer(acc, value, index, this), ...args);
  }
  join(separator) {
    return this.__native.join(separator);
  }

  has(idx) {
    return idx < this.size();
  }
  delete(idx) {
    const hasIdx = this.has(idx);
    if (hasIdx) {
      this.__native[idx] = undefined;
    }
    return hasIdx;
  }

  // Conversions
  toList() {
    return this;
  }
  toArray() {
    return Array.from(this.__native);
  }

  // Iterators
  keys() {
    return range(this.__native.length);
  }

  values() {
    return this[Symbol.iterator]();
  }

  *entries() {
    for (let i = 0; i < this.__native.length; i++) {
      yield [i, this.__native[i]];
    }
  }

  static isList(shape) {
    return isMutableIndexed(shape);
  }

  static of(...values) {
    return new List(values);
  }
}

export default Namespace.__register('Indexed', List);
