import { range } from 'iter-tools';
import ConcreteCollectionMixin, { registerSubtype } from '../../collection-concrete-mixin';
import { IndexedMixin } from '..';

const aProto = Array.prototype;

/**
 * List is a little extra special in that it does not derive from Array,
 * particularly because there is no mechanism to fall back on if es6 extend
 * is not supported. See article:
 * http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/
 *
 * At some point in the future (when IE is well and truly dead) there should
 * additionally be an Array type which extends Array.
 **/
export class List {
  constructor(iterable) {
    this._array = Array.from(iterable);
  }

  get size() {
    return this._array.length;
  }

  __doCollectionTransform(transform) {
    const CollectionConstructor = this.constructor;
    const arr = new CollectionConstructor();
    arr._array = transform(this._array);
    return arr;
  }

  __possiblyUseNativeImplementaton(methodName, ...args) {
    return typeof aProto[methodName] === 'function'
      ? this.__doCollectionTransform(arr => aProto[methodName].apply(arr, args))
      : super[methodName](...args);
  }

  get(idx) {
    return this._array[idx];
  }
  set(idx, value) {
    this._array[idx] = value;
    return this;
  }
  push(...values) {
    this._array.push(...values);
    return this;
  }
  pop() {
    return this._array.pop();
  }
  shift() {
    return this._array.shift();
  }
  unshift(value) {
    this._array.unshift(value);
    return this;
  }
  clear() {
    this._array = [];
    return this;
  }

  fill(...args) {
    this._array.fill(...args);
    return this;
  }
  map(mapFn) {
    return this.__doCollectionTransform(() => this._array.map(mapFn));
  }
  filter(filterFn) {
    return this.__doCollectionTransform(() => this._array.filter(filterFn));
  }
  slice(...args) {
    return this.__doCollectionTransform(() => this._array.slice(...args));
  }
  concat(...args) {
    return this.__doCollectionTransform(() => this._array.concat(...args));
  }
  reverse(...args) {
    return this.__doCollectionTransform(() => this._array.reverse(...args));
  }
  reduce(...args) {
    return this._array.reduce(...args);
  }
  join(separator) {
    return this._array.join(separator);
  }

  // Possibly native functions
  reduceRight(...args) {
    return this.__possiblyUseNativeImplementaton('reduceRight', ...args);
  }

  // Conversions
  toList() {
    return this;
  }
  toArray() {
    return Array.from(this._array);
  }

  // Iterators
  *[Symbol.iterator]() {
    yield* this._array;
  }

  keys() {
    return range(this._array.length);
  }

  values() {
    return this[Symbol.iterator]();
  }

  *entries() {
    for (let i = 0; i < this._array.length; i++) {
      yield [i, this._array[i]];
    }
  }
}

export default class SequinsList extends IndexedMixin(ConcreteCollectionMixin(List)) {}

registerSubtype('Indexed', SequinsList);
