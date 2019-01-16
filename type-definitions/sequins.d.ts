/**
 * The Immutable.js API is copyrighted (c) 2014-present by Facebook, Inc.
 * It is used here by permission of the MIT license, and under the principle
 * of fair use.
 *
 * @grouped
 */

import {
  NativeMapConstructor,
  NativeSetConstructor,
  NativeMap,
  NativeSet
} from "./native";

type CollectionLike<K, V> =
  | Collection<K, V>
  | Array<V>
  | NativeSet<V>
  | NativeMap<K, V>;

// Concrete

interface ListConstructor {
  new <T>(collection: Iterable<T>): List<T>;
  new (collection?: null): List<any>;
  new <T>(): List<T>;

  /**
   * True if the provided value is a List
   *
   * <!-- runkit:activate
   *   { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * List.isList([]); // false
   * List.isList(new List()); // true
   * ```
   */
  isList(maybeList: any): maybeList is List<any>;

  /**
   * Creates a new Sequins List containing `values`.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * List.of(1, 2, 3, 4)
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Note: Values are not altered or converted in any way.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * List.of({x:1}, 2, [3], 4)
   * // List [ { x: 1 }, 2, [ 3 ], 4 ]
   * ```
   */
  of<T>(...values: Array<T>): List<T>;

  /**
   * @ignore
   */
  readonly prototype: List<any>;
}

/**
 * List is a dense `Indexed` `Collection` backed by a JavaScript array.
 * List shares its peformance charactersitics with array too. `get`, `set`,
 * `push`, and `pop` are all O(1) on lists. `shift` and `unshift` are O(n).
 *
 * Unlike a JavaScript Array, there is no distinction between an
 * "unset" index and an index set to `undefined`. `List#forEach` visits all
 * indices from 0 to size, regardless of whether they were explicitly defined.
 */
interface List<T> extends Concrete<number, T>, Indexed<T> {
  /**
   * The number of items in this List.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Sets `index` to `value`.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.set(-1, "value")` sets the last item in the List.
   *
   * If `index` larger than `size`, the returned List's `size` will be large
   * enough to include the `index`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * const originalList = List([ 0 ]);
   * // List [ 0 ]
   * originalList.set(1, 1);
   * // List [ 0, 1 ]
   * originalList.set(0, 'overwritten');
   * // List [ "overwritten" ]
   * originalList.set(2, 2);
   * // List [ 0, undefined, 2 ]
   *
   * new List().set(50000, 'value').size;
   * // 50001
   * ```
   */
  set(index: number, value: T): List<T>;

  /**
   * Removes the value at `index` from the list. Values at indices above
   * `index` are shifted down by 1 to fill the position.
   *
   * This is synonymous with `list.splice(index, 1)`.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.delete(-1)` deletes the last item in the List.
   *
   * Note: `delete` cannot be safely used in IE8
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 0, 1, 2, 3, 4 ]).delete(0);
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * @alias remove
   */
  delete(index: number): List<T>;
  remove(index: number): List<T>;

  /**
   * Inserts `value` at `index` in the list. Values at indices above
   * `index` are shifted over by 1.
   *
   * This is synonymous with `list.splice(index, 0, value)`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 0, 1, 2, 3, 4 ]).insert(6, 5)
   * // List [ 0, 1, 2, 3, 4, 5 ]
   * ```
   */
  insert(index: number, value: T): List<T>;

  /**
   * Removes all values from the list.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 1, 2, 3, 4 ]).clear()
   * // List []
   * ```
   */
  clear(): List<T>;

  /**
   * Appends `values` to the end of the list.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 1, 2, 3, 4 ]).push(5)
   * // List [ 1, 2, 3, 4, 5 ]
   * ```
   */
  push(...values: Array<T>): List<T>;

  /**
   * Removes the last value from the list and returns it.
   *
   * ```js
   * new List([ 1, 2, 3, 4 ]).pop()
   * // List[ 1, 2, 3 ]
   * ```
   */
  pop(): List<T>;

  /**
   * Inserts `values` at the beginning of the list. Note that this will
   * require shifting every item in the list, and will take O(n) time.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 2, 3, 4]).unshift(1);
   * // List [ 1, 2, 3, 4 ]
   * ```
   */
  unshift(...values: Array<T>): List<T>;

  /**
   * Removes the first value from the list and returns it. Note that
   * this will require shifting every item in the list, and will take O(n)
   * time.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 0, 1, 2, 3, 4 ]).shift();
   * // List [ 1, 2, 3, 4 ]
   * ```
   */
  shift(): List<T>;

  /**
   * Sets list's `size`. If `size` is less than the list's size, values at
   * higher indices will be excluded. If `size` is greater than the list's
   * size, newly created indicies will have undefined values.
   */
  setSize(size: number): List<T>;

  // Sequence algorithms

  /**
   * Returns a new List with other values or collections concatenated to this one.
   *
   * @alias merge
   */
  concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): List<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): List<T | C>;

  /**
   * Returns a new List with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 1, 2 ]).map(x => 10 * x)
   * // List [ 10, 20 ]
   * ```
   */
  map<M>(mapper: (value: T, key: number, iter: this) => M): List<M>;

  /**
   * @see Collection.flatten
   */
  flatten(depth?: number): List<any>;
  flatten(shallow?: boolean): List<any>;

  /**
   * Flat-maps the List, returning a new List.
   *
   * Similar to `list.map(...).flatten(true)`.
   */
  flatMap<M>(
    mapper: (value: T, key: number, iter: this) => Iterable<M>
  ): List<M>;

  /**
   * Returns a new List with only the values for which the `predicate`
   * function returns true.
   */
  filter<F extends T>(
    predicate: (value: T, index: number, iter: this) => value is F
  ): List<F>;
  filter(predicate: (value: T, index: number, iter: this) => any): this;

  /**
   * Returns a List "zipped" with the provided collection.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * const a = new List([ 1, 2, 3 ]);
   * const b = new List([ 4, 5, 6 ]);
   * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: CollectionLike<any, U>): List<[T, U]>;
  zip<U, V>(
    other: CollectionLike<any, U>,
    other2: CollectionLike<any, V>
  ): List<[T, U, V]>;
  zip(...collections: Array<CollectionLike<any, any>>): List<any>;

  /**
   * Returns a List "zipped" with the provided collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * const a = new List([ 1, 2 ]);
   * const b = new List([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   *
   * Note: Since zipAll will return a collection as large as the largest
   * input, some results may contain undefined values. TypeScript cannot
   * account for these without cases (as of v2.5).
   */
  zipAll<U>(other: CollectionLike<any, U>): List<[T, U]>;
  zipAll<U, V>(
    other: CollectionLike<any, U>,
    other2: CollectionLike<any, V>
  ): List<[T, U, V]>;
  zipAll(...collections: Array<CollectionLike<any, any>>): List<any>;

  /**
   * Returns a List "zipped" with the provided collections by using a
   * custom `zipper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * const a = new List([ 1, 2, 3 ]);
   * const b = new List([ 4, 5, 6 ]);
   * const c = a.zipWith((a, b) => a + b, b);
   * // List [ 5, 7, 9 ]
   * ```
   */
  zipWith<U, Z>(
    zipper: (value: T, otherValue: U) => Z,
    otherCollection: CollectionLike<any, U>
  ): List<Z>;
  zipWith<U, V, Z>(
    zipper: (value: T, otherValue: U, thirdValue: V) => Z,
    otherCollection: CollectionLike<any, U>,
    thirdCollection: CollectionLike<any, V>
  ): List<Z>;
  zipWith<Z>(
    zipper: (...any: Array<any>) => Z,
    ...collections: Array<CollectionLike<any, any>>
  ): List<Z>;

  // Combination

  /**
   * Returns a List with `separator` between each item.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new List([ 1, 2, 3 ]).interpose(null);
   * // List [ 1, null, 2, null, 3]
   * ```
   */
  interpose<S>(separator: S): List<S | T>;

  // Conversions

  /**
   * Deeply converts all nested structures to Objects and Arrays.
   */
  toJS(): Array<any>;

  /**
   * Returns an Array containing the values from the List.
   */
  toJSON(): Array<T>;

  toConcrete(): this;

  /**
   * Returns an `IndexedSequence` of the values from the List.
   */
  toSeq(): IndexedSequence<T>;
}

export const List: ListConstructor;

interface MapConstructor {
  /**
   * This signature is just to make typescript happy about type inference with
   * literal arrays of arrays. Technically the Iterable signature already
   * covers the Array case, so no need to complicate the docs with an
   * implementation detail.
   * @ignore
   */
  new <K, V>(entries: ReadonlyArray<[K, V]>): Map<K, V>;
  new <K, V>(entries: Iterable<[K, V]>): Map<K, V>;
  new <K, V>(collection: Collection<K, V>): Map<K, V>;
  new <V>(obj: { [key: string]: V }): Map<string, V>;
  new (entries?: null): Map<any, any>;
  new <K, V>(): Map<K, V>;

  /**
   * True if the provided value is a Map
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * Map.isMap({}) // false
   * Map.isMap(new Map()) // true
   * ```
   */
  isMap(maybeMap: any): maybeMap is Map<any, any>;

  /**
   * @ignore
   */
  readonly prototype: Map<any, any>;
}

/**
 * Map is a `Keyed` `Collection` of `[key, value]` tuples with
 * O(1) `get` and `set`. Its API is fully compatible with that of
 * [JavaScript Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map),
 * but the Sequins Map class delegates to a native Map for storage as
 * opposed to extending the native Map class.
 *
 * Map's keys can be of any type. This allows the use of any value
 * (including NaN) as a key. Strict identity is used to evaluate key
 * equality. Two similar looking objects, for example, when both used as
 * keys, will store two separate values.
 */
interface Map<K, V> extends Concrete<K, V>, Keyed<K, V> {
  /**
   * The number of entries in this Map.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Sets `key` to `value`. If an equivalent the key already exists in
   * the map, it will be replaced.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * const originalMap = Map()
   * const newerMap = originalMap.set('key', 'value')
   * const newestMap = newerMap.set('key', 'newer value')
   *
   * originalMap
   * // Map {}
   * newerMap
   * // Map { "key": "value" }
   * newestMap
   * // Map { "key": "newer value" }
   * ```
   */
  set(key: K, value: V): this;

  /**
   * Removes `key` and its associated value from the map.
   *
   * Note: `delete` cannot be safely used in IE8, but is provided to mirror
   * the ES6 collection API.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * const originalMap = Map({
   *   key: 'value',
   *   otherKey: 'other value'
   * })
   * // Map { "key": "value", "otherKey": "other value" }
   * originalMap.delete('otherKey')
   * // Map { "key": "value" }
   * ```
   *
   * @alias remove
   */
  delete(key: K): this;
  remove(key: K): this;

  /**
   * Removes all keys and values from the map.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * new Map({ key: 'value' }).clear()
   * // Map {}
   * ```
   */
  clear(): this;

  /**
   * Returns a new Map resulting from merging the provided Collections
   * (or JS objects) into this Map. In other words, this takes each entry of
   * each collection and sets it on this Map.
   *
   * Note: Values provided to `merge` are shallowly converted before being
   * merged. No nested values are altered.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * const one = new Map({ a: 10, b: 20, c: 30 })
   * const two = new Map({ b: 40, a: 50, d: 60 })
   * one.merge(two) // Map { "a": 50, "b": 40, "c": 30, "d": 60 }
   * two.merge(one) // Map { "b": 20, "a": 10, "d": 60, "c": 30 }
   * ```
   *
   * @alias concat
   */
  merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map<K | KC, V | VC>;
  merge<C>(...collections: Array<{ [key: string]: C }>): Map<K | string, V | C>;
  concat<KC, VC>(
    ...collections: Array<Iterable<[KC, VC]>>
  ): Map<K | KC, V | VC>;
  concat<C>(
    ...collections: Array<{ [key: string]: C }>
  ): Map<K | string, V | C>;

  // Sequence algorithms

  /**
   * Returns a new Map with values passed through a
   * `mapper` function.
   *
   *     new Map({ a: 1, b: 2 }).map(x => 10 * x)
   *     // Map { a: 10, b: 20 }
   */
  map<M>(mapper: (value: V, key: K, iter: this) => M): Map<K, M>;

  /**
   * @see Keyed.mapKeys
   */
  mapKeys<M>(mapper: (key: K, value: V, iter: this) => M): Map<M, V>;

  /**
   * @see Keyed.mapEntries
   */
  mapEntries<KM, VM>(
    mapper: (entry: [K, V], index: number, iter: this) => [KM, VM]
  ): Map<KM, VM>;

  /**
   * @see Collection.flatten
   */
  flatten(depth?: number): Map<any, any>;
  flatten(shallow?: boolean): Map<any, any>;

  /**
   * Flat-maps the Map, returning a new Map.
   *
   * Similar to `data.map(...).flatten(true)`.
   */
  flatMap<KM, VM>(
    mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>
  ): Map<KM, VM>;

  /**
   * Returns a new Map with only the entries for which the `predicate`
   * function returns true.
   */
  filter<F extends V>(
    predicate: (value: V, key: K, iter: this) => value is F
  ): Map<K, F>;
  filter(predicate: (value: V, key: K, iter: this) => any): this;

  /**
   * @see Keyed.flip
   */
  flip(): Map<V, K>;

  // Conversions

  /**
   * Deeply converts all nested structures to Objects and Arrays.
   */
  toJS(): { [key: string]: any };

  /**
   * Returns an Object with the keys (stringified) and values from the Map.
   */
  toJSON(): { [key: string]: V };

  toConcrete(): this;

  /**
   * Returns an `KeyedSequence` of the entries from the List.
   */
  toSeq(): KeyedSequence<K, V>;
}

export const Map: MapConstructor;

interface SetConstructor {
  new <T>(collection: Iterable<T>): Set<T>;
  new (collection?: null): Set<any>;
  new <T>(): Set<T>;

  /**
   * True if the provided value is a Set
   */
  isSet(maybeSet: any): maybeSet is Set<any>;

  /**
   * Creates a new Set containing `values`.
   */
  of<T>(...values: Array<T>): Set<T>;

  /**
   * `Set.fromKeys()` creates a new immutable Set containing the keys from
   * this Collection or JavaScript Object.
   */
  fromKeys<T>(iter: Collection<T, any>): Set<T>;
  fromKeys(obj: { [key: string]: any }): Set<string>;
  fromKeys(): Set<any>;

  /**
   * `Set.union()` creates a new Set that includes all members present in any
   * input Set.
   *
   * If an input is an associative iterable, its values are considered the Set.
   *
   * ```js
   * const { Set } = require('immutable')
   * const unioned = Set.union([
   *   Set([ 'a', 'b', 'c' ])
   *   Set([ 'c', 'a', 't' ])
   * ])
   * // Set [ "a", "b", "c", "t"" ]
   * ```
   */
  union<T>(...sets: Array<Iterable<T>>): Set<T>;

  /**
   * `Set.intersect()` creates a new Set that includes only members that are
   * present in all input Sets.
   *
   * If an input is an associative iterable, its values are considered the Set.
   *
   * ```js
   * const { Set } = require('immutable')
   * const intersected = Set.intersect([
   *   Set([ 'a', 'b', 'c' ])
   *   Set([ 'c', 'a', 't' ])
   * ])
   * // Set [ "a", "c"" ]
   * ```
   */
  intersect<T>(...sets: Array<Iterable<T>>): Set<T>;

  /**
   * @ignore
   */
  readonly prototype: Set<any>;
}

/**
 * Set is a `Duplicated` `Collection` of unique values with O(1) `add` and `has`.
 * Its API is fully compatible with that of
 * [JavaScript Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set),
 * but the Sequins Set class delegates to a native Set for storage as
 * opposed to extending the native Set class.
 *
 * When iterating a Set, the entries will be [value, value] tuples.
 *
 * Set values, like Map keys, may be of any type including other collections
 * and NaN.
 */
interface Set<T> extends Concrete<T, T>, Duplicated<T> {
  /**
   * The number of items in this Set.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Adds value to the set.
   */
  add(value: T): this;

  /**
   * Removes value from the set.
   *
   * Note: `delete` **cannot** be safely used in IE8, use `remove` if
   * supporting old browsers.
   *
   * @alias remove
   */
  delete(value: T): this;
  remove(value: T): this;

  /**
   * Clears all keys and values from the set
   */
  clear(): this;

  /**
   * Returns a Set including any value from `collections` that does not already
   * exist in this Set.
   * @alias merge
   * @alias concat
   */
  union<C>(...collections: Array<Iterable<C>>): Set<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): Set<T | C>;
  concat<C>(...collections: Array<Iterable<C>>): Set<T | C>;

  /**
   * Returns a Set which has removed any values not also contained
   * within `collections`.
   */
  intersect(...collections: Array<Iterable<T>>): this;

  /**
   * Returns a Set excluding any values contained within `collections`.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Set } = require('sequins');" }
   * -->
   * ```js
   * new Set([ 1, 2, 3 ]).subtract([1, 3])
   * // Set [2]
   * ```
   */
  subtract(...collections: Array<Iterable<T>>): this;

  // Sequence algorithms

  /**
   * Returns a new Set with values passed through a
   * `mapper` function.
   *
   *     new Set([1,2]).map(x => 10 * x)
   *     // Set [10,20]
   */
  map<M>(mapper: (value: T, key: T, iter: this) => M): Set<M>;

  /**
   * @see Collection.flatten
   */
  flatten(depth?: number): Set<any>;
  flatten(shallow?: boolean): Set<any>;

  /**
   * Flat-maps the Set, returning a new Set.
   *
   * Similar to `set.map(...).flatten(true)`.
   */
  flatMap<M>(mapper: (value: T, key: T, iter: this) => Iterable<M>): Set<M>;

  /**
   * Returns a new Set with only the values for which the `predicate`
   * function returns true.
   */
  filter<F extends T>(
    predicate: (value: T, key: T, iter: this) => value is F
  ): Set<F>;
  filter(predicate: (value: T, key: T, iter: this) => any): this;

  // Conversions

  /**
   * Deeply converts all nested structures to Objects and Arrays.
   */
  toJS(): Array<any>;

  /**
   * Returns an Array with the values from the Set.
   */
  toJSON(): Array<T>;

  toConcrete(): this;

  /**
   * Returns a `SetSequence` of the values from the Set.
   */
  toSeq(): SetSequence<T>;
}

export const Set: SetConstructor;

// Sequence

interface IndexedSequenceConstructor {
  new <T>(collection: Iterable<T>): IndexedSequence<T>;
  new (collection?: null): IndexedSequence<any>;
  new <T>(): IndexedSequence<T>;

  /**
   * Creates a new IndexedSequence containing `values`.
   */
  of<T>(...values: Array<T>): IndexedSequence<T>;

  /**
   * @ignore
   */
  readonly prototype: IndexedSequence<any>;
}

/**
 * An IndexedSequence is quite simply an `Indexed` `Sequence`. It represents
 * sequential transformations against Array or List-like data as a series of
 * chained function calls. The chain of calls will usually be terminated with
 * `toList`.
 *
 * When constructing an IndexedSequence from another data type, keys will be
 * discarded.
 */
interface IndexedSequence<T> extends Sequence<number, T>, Indexed<T> {
  // Combination

  /**
   * Returns a new IndexedSequence with other collections concatenated to this
   * one.
   */
  concat<C>(
    ...valuesOrCollections: Array<Iterable<C> | C>
  ): IndexedSequence<T | C>;

  /**
   * Returns an IndexedSequence with `separator` between each item.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('sequins');" }
   * -->
   * ```js
   * new IndexedSequence([ 1, 2, 3 ]).interpose(null);
   * // IndexedSequence [ 1, null, 2, null, 3]
   * ```
   */
  interpose<S>(separator: S): IndexedSequence<S | T>;

  // Sequence algorithms

  /**
   * Returns a new IndexedSequence with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Seq } = require('sequins');" }
   * -->
   * ```js
   * IndexedSequence([ 1, 2 ]).map(x => 10 * x)
   * // Seq [ 10, 20 ]
   * ```
   */
  map<M>(mapper: (value: T, key: number) => M): IndexedSequence<M>;

  /**
   * Does not alter the sequence, but allows you to inspect values as they are
   * comptued. Returns the sequence for chaining. Unlike `forEach`, tap does not
   * evaluate the sequence.
   *
   * ```js
   * const seq = IndexedSequence([ 1, 2 ]).tap(x => console.log(x))
   * Array.from(seq); // logs 1, 2
   * ```
   */
  tap(fn: (value: T, key: number) => any): this;

  /**
   * @see Collection.flatten
   */
  flatten(depth?: number): IndexedSequence<any>;
  flatten(shallow?: boolean): IndexedSequence<any>;

  /**
   * Flat-maps the IndexedSequence, returning an IndexedSequence.
   *
   * Similar to `seq.map(...).flatten(true)`.
   */
  flatMap<M>(
    mapper: (value: T, key: number) => Iterable<M>
  ): IndexedSequence<M>;

  /**
   * Returns a new IndexedSequence with only the values for which the
   * `predicate` function returns true.
   */
  filter<F extends T>(
    predicate: (value: T, index: number) => value is F
  ): IndexedSequence<F>;
  filter(predicate: (value: T, index: number) => any): this;

  /**
   * Returns a new IndexedSequence "zipped" with the provided collections.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * ```js
   * const a = Seq([ 1, 2, 3 ]);
   * const b = Seq([ 4, 5, 6 ]);
   * const c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: CollectionLike<any, U>): IndexedSequence<[T, U]>;
  zip<U, V>(
    other: CollectionLike<any, U>,
    other2: CollectionLike<any, V>
  ): IndexedSequence<[T, U, V]>;
  zip(...collections: Array<CollectionLike<any, any>>): IndexedSequence<any>;

  /**
   * Returns a new IndexedSequence "zipped" with the provided collections.
   * Continues until the longest collection is exhausted.
   *
   * Missing values from shorter collections are filled with `undefined`.
   *
   * ```js
   * const a = Seq([ 1, 2 ]);
   * const b = Seq([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // Seq [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   */
  zipAll<U>(other: CollectionLike<any, U>): IndexedSequence<[T, U]>;
  zipAll<U, V>(
    other: CollectionLike<any, U>,
    other2: CollectionLike<any, V>
  ): IndexedSequence<[T, U, V]>;
  zipAll(...collections: Array<CollectionLike<any, any>>): IndexedSequence<any>;

  /**
   * Returns a new IndexedSequence "zipped" with the provided collections by
   * using a custom `zipper` function.
   *
   * ```js
   * const a = Seq([ 1, 2, 3 ]);
   * const b = Seq([ 4, 5, 6 ]);
   * const c = a.zipWith((a, b) => a + b, b);
   * // Seq [ 5, 7, 9 ]
   * ```
   */
  zipWith<U, Z>(
    zipper: (value: T, otherValue: U) => Z,
    otherCollection: CollectionLike<any, U>
  ): IndexedSequence<Z>;
  zipWith<U, V, Z>(
    zipper: (value: T, otherValue: U, thirdValue: V) => Z,
    otherCollection: CollectionLike<any, U>,
    thirdCollection: CollectionLike<any, V>
  ): IndexedSequence<Z>;
  zipWith<Z>(
    zipper: (...any: Array<any>) => Z,
    ...collections: Array<CollectionLike<any, any>>
  ): IndexedSequence<Z>;

  // Conversions

  /**
   * Returns a `List` of the sequence's values
   */
  toConcrete(): List<T>;

  /**
   * Returns itself
   */
  toSeq(): this;

  /**
   * Deeply converts this IndexedSequence to equivalent native JavaScript
   * Array.
   */
  toJS(): Array<any>;

  /**
   * Shallowly converts this IndexedSequence to equivalent native JavaScript
   * Array.
   */
  toJSON(): Array<T>;
}

export const IndexedSequence: IndexedSequenceConstructor;

interface KeyedSequenceConstructor {
  /**
   * This signature is just to make typescript happy about type inference with
   * literal arrays of arrays. Technically the Iterable signature already
   * covers the Array case, so no need to complicate the docs with an
   * implementation detail.
   * @ignore
   */
  new <K, V>(entries: ReadonlyArray<[K, V]>): KeyedSequence<K, V>;
  new <K, V>(entries: Iterable<[K, V]>): KeyedSequence<K, V>;
  new <K, V>(collection: Collection<K, V>): KeyedSequence<K, V>;
  new <V>(obj: { [key: string]: V }): KeyedSequence<string, V>;
  new (entries?: null): KeyedSequence<any, any>;
  new <K, V>(): KeyedSequence<K, V>;

  /**
   * @ignore
   */
  readonly prototype: KeyedSequence<any, any>;
}

/**
 * A KeyedSequence is, as expected, a `Keyed` `Sequence`. It represents
 * sequential transformations on Object or Map-like data as a series of
 * chained function calls. Note that a KeyedSequence lacks the key-coalescing
 * property of a `Map`. Duplicate keys will be eliminated when calling `as(Map)`
 * which will usually be the last call in the chain.
 *
 * When constructing a KeyedSequence pass either keyed data or an iterable of
 * [K, V] tuples.
 */
interface KeyedSequence<K, V> extends Sequence<K, V>, Keyed<K, V> {
  /**
   * Returns a new KeyedSequence with other collections concatenated to this one.
   *
   * All entries will be present in the resulting KeyedSequence, even if they
   * have the same key.
   */
  concat<KC, VC>(
    ...collections: Array<Iterable<[KC, VC]>>
  ): KeyedSequence<K | KC, V | VC>;
  concat<C>(
    ...collections: Array<{ [key: string]: C }>
  ): KeyedSequence<K | string, V | C>;

  /**
   * Returns a new KeyedSequence with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { KeyedSequence } = require('sequins');" }
   * -->
   * ```js
   * KeyedSequence({ a: 1, b: 2 }).map(x => 10 * x)
   * // Seq { "a": 10, "b": 20 }
   * ```
   */
  map<M>(mapper: (value: V, key: K) => M): KeyedSequence<K, M>;

  /**
   * @see Keyed.mapKeys
   */
  mapKeys<M>(mapper: (key: K, value: V) => M): KeyedSequence<M, V>;

  /**
   * @see Keyed.mapEntries
   */
  mapEntries<KM, VM>(
    mapper: (entry: [K, V], index: number) => [KM, VM]
  ): KeyedSequence<KM, VM>;

  /**
   * Does not alter the sequence, but allows you to inspect keys and values as
   * they are comptued. Returns the sequence for chaining. Unlike `forEach`, tap
   * does not evaluate the sequence.
   *
   * ```js
   * const seq = KeyedSequence([[1, 1], [2, 2]]).tap(x => console.log(x))
   * Array.from(seq); // logs 1, 2
   * ```
   */
  tap(fn: (value: V, key: K) => any): KeyedSequence<K, V>;

  /**
   * @see Collection.flatten
   */
  flatten(depth?: number): KeyedSequence<any, any>;
  flatten(shallow?: boolean): KeyedSequence<any, any>;

  /**
   * Flat-maps the KeyedSequence, returning a new KeyedSequence.
   *
   * Similar to `seq.map(...).flatten(true)`.
   */
  flatMap<KM, VM>(
    mapper: (value: V, key: K) => Iterable<[KM, VM]>
  ): KeyedSequence<KM, VM>;

  /**
   * Returns a new KeyedSequence with only the entries for which the `predicate`
   * function returns true.
   */
  filter<F extends V>(
    predicate: (value: V, key: K) => value is F
  ): KeyedSequence<K, F>;
  filter(predicate: (value: V, key: K) => any): this;

  /**
   * @see Keyed.flip
   */
  flip(): KeyedSequence<V, K>;

  // Conversions

  /**
   * Deeply converts this KeyedSequence to equivalent native JavaScript Object.
   *
   * Converts keys to Strings.
   */
  toJS(): Object;

  /**
   * Shallowly converts this KeyedSequence to equivalent native JavaScript Object.
   *
   * Converts keys to Strings.
   */
  toJSON(): { [key: string]: V };

  /**
   * Returns a `Map` of the entries from this sequence.
   */
  toConcrete(): Map<K, V>;

  /**
   * Returns itself
   */
  toSeq(): this;
}

export const KeyedSequence: KeyedSequenceConstructor;

interface SetSequenceConstructor {
  new <T>(collection: Iterable<T>): SetSequence<T>;
  new (collection?: null): SetSequence<any>;
  new <T>(): SetSequence<T>;

  /**
   * Creates a new SetSequence containing `values`.
   */
  of<T>(...values: Array<T>): SetSequence<T>;

  /**
   * @ignore
   */
  readonly prototype: SetSequence<any>;
}

/**
 * A SetSequence is a `Duplicated` `Sequence`. It represents sequntial
 * transformations on Set-like data as a series of chained function calls.
 * Note that a SetSequence is allowed to contain duplicate values. Such
 * duplicates will be eliminated when using `as(Set)` or a similar method to
 * convert back to a concrete type after the desired transformations are
 * made.
 *
 * When constructing a SetSequence from another data type, any associated
 * indices or keys are discareded.
 */
interface SetSequence<T> extends Sequence<T, T>, Duplicated<T> {
  /**
   * Returns a new SetSequence with other collections concatenated to this one.
   *
   * All entries will be present in the resulting SetSequence, even if they
   * are duplicates.
   */
  concat<U>(...collections: Array<Iterable<U>>): SetSequence<T | U>;

  /**
   * Returns a new SetSequence with values passed through a
   * `mapper` function.
   *
   * ```js
   * SetSequence([ 1, 2 ]).map(x => 10 * x)
   * // Seq { 10, 20 }
   * ```
   */
  map<M>(mapper: (value: T, key: T) => M): SetSequence<M>;

  /**
   * Does not alter the sequence, but allows you to inspect values as they are
   * comptued. Returns the sequence for chaining. Unlike `forEach`, tap does not
   * evaluate the sequence.
   *
   * ```js
   * const seq = SetSequence([ 1, 2 ]).tap(x => console.log(x))
   * Array.from(seq); // logs 1, 2
   * ```
   */
  tap(fn: (value: T, key: T) => any): this;

  /**
   * @see Collection.flatten
   */
  flatten(depth?: number): SetSequence<any>;
  flatten(shallow?: boolean): SetSequence<any>;

  /**
   * Flat-maps the SetSequence, returning a SetSequence.
   *
   * Similar to `seq.map(...).flatten(true)`.
   */
  flatMap<M>(mapper: (value: T, key: T) => Iterable<M>): SetSequence<M>;

  /**
   * Returns a new SetSequence with only the values for which the `predicate`
   * function returns true.
   */
  filter<F extends T>(
    predicate: (value: T, key: T) => value is F
  ): SetSequence<F>;
  filter(predicate: (value: T, key: T) => any): this;

  // Conversion
  /**
   * Deeply converts this SetSequence to equivalent native JavaScript Array.
   */
  toJS(): Array<any>;

  /**
   * Shallowly converts this SetSequence to equivalent native JavaScript Array.
   */
  toJSON(): Array<T>;

  /**
   * Returns a `Set` of the values from this sequence.
   */
  toConcrete(): Set<T>;

  /**
   * Returns itself
   */
  toSeq(): this;
}

export const SetSequence: SetSequenceConstructor;

export function Seq<S extends Sequence<any, any>>(seq: S): S;
export function Seq<K, V>(collection: Keyed<K, V>): KeyedSequence<K, V>;
export function Seq<T>(collection: Indexed<T>): IndexedSequence<T>;
export function Seq<T>(collection: Duplicated<T>): SetSequence<T>;
export function Seq<T>(collection: Iterable<T>): IndexedSequence<T>;
export function Seq<V>(obj: { [key: string]: V }): KeyedSequence<string, V>;
export function Seq(collection?: null): IndexedSequence<any>;

/**
 * Seq is a helper function for creating instances of `Sequence`. Given any argument,
 * Seq will make a best-effort guess as to the appropriate `Sequence` subtype, and
 * will return an instance of it. The desired Sequence type can be selected by using
 * one of the nested functions: `Seq.Indexed`, `Seq.Keyed`, or `Seq.Set`.
 *
 * Seq's best-effort selection of subtypes uses the following logic:
 *
 *   * If a `Collection` a `Sequence` of the same subtype as the collection
 *   * If an Array-like or Iterable, an `IndexedSequence`.
 *   * If an Object, a `KeyedSequence`.
 *
 * @constructs
 */
export namespace Seq {
  /**
   * True if `maybeSeq` is a Sequence, it is not backed by a concrete
   * structure such as Map, List, or Set.
   */
  function isSeq(
    maybeSeq: any
  ): maybeSeq is
    | IndexedSequence<any>
    | KeyedSequence<any, any>
    | SetSequence<any>;

  /**
   * Factory function for convenient construction of `KeyedSequence` instances
   *
   * @constructs
   */
  export function Keyed<K, V>(
    collection: Iterable<[K, V]>
  ): KeyedSequence<K, V>;
  export function Keyed<V>(obj: { [key: string]: V }): KeyedSequence<string, V>;
  export function Keyed<K, V>(): KeyedSequence<K, V>;
  export function Keyed(): KeyedSequence<any, any>;

  export namespace Indexed {
    /**
     * Provides an IndexedSequence of the values provided.
     */
    function of<T>(...values: Array<T>): IndexedSequence<T>;
  }

  /**
   * Factory function for convenient construction of `IndexedSequence` instances
   *
   * @constructs
   */
  export function Indexed(): IndexedSequence<any>;
  export function Indexed<T>(): IndexedSequence<T>;
  export function Indexed<T>(collection: Iterable<T>): IndexedSequence<T>;

  export namespace Set {
    /**
     * Returns a SetSequence of the provided values
     */
    function of<T>(...values: Array<T>): SetSequence<T>;
  }

  /**
   * Factory function for convenient construction of `SetSequence` instances
   *
   * @constructs
   */
  export function Set(): SetSequence<any>;
  export function Set<T>(): SetSequence<T>;
  export function Set<T>(collection: Iterable<T>): SetSequence<T>;
}

// Native

export const NativeMap: typeof NativeMapConstructor;
export const NativeSet: typeof NativeSetConstructor;

// Abstract

/**
 * Concretes are a type of `Collection` which store their own data
 * and have O(1) random access. It is the base class for `List`, `Map`, and
 * `Set`.
 */
export interface Concrete<K, V> extends Collection<K, V> {
  // Reading values

  /**
   * Returns the value associated with the provided key, or notSetValue if
   * the Collection does not contain this key.
   *
   * Note: it is possible a key may be associated with an `undefined` value,
   * so if `notSetValue` is not provided and this method returns `undefined`,
   * that does not guarantee the key was not found.
   */
  get<NSV>(key: K, notSetValue: NSV): V | NSV;
  get(key: K): V | undefined;

  /**
   * True if a key exists within this `Collection`.
   * to determine equality
   */
  has(key: K): boolean;

  /**
   * True if a value exists within this `Collection`.
   * @alias contains
   */
  includes(value: V): boolean;
  contains(value: V): boolean;

  /**
   * In case the `Collection` is not empty returns the first element of the
   * `Collection`.
   * In case the `Collection` is empty returns the optional default
   * value if provided, if no default value is provided returns undefined.
   */
  first<NSV>(notSetValue?: NSV): V | NSV;

  // Reducing a value

  /**
   * Returns true if this Collection includes no values.
   *
   * For some lazy `Seq`, `isEmpty` might need to iterate to determine
   * emptiness. At most one iteration will occur.
   */
  isEmpty(): boolean;
}

/**
 * Sequence is the abstract base class for describing efficient, lazy
 * transformations. Sequences never store their own data, instead they
 * describe how to compute values (or keys) using a series of transforms against
 * some source data. Sequences are immutable with regards to which transforms
 * they apply, but as their source data is mutable applying the sequence
 * transformations more than once may yield different results if the source data
 * has changed. Sequence subtypes are `IndexedSequence`, `KeyedSequence`,
 * and `SetSequence`.
 *
 * Why are Sequences efficient? Both a sequence and a concrete
 * structure may be transformed through chanined operations like
 * `nums.filter(x => x > 0).map(x => x + 1)`. The difference is in how they
 * execute. A concrete structure will do all the mapping (and store it) and
 * then do all the filtering on the mapped results. A sequence executes value
 * by value not transform by transform. The filter function will read numbers
 * until it finds one greater than 0 then the mapper function will
 * add one to it. Only then will a second value be read.
 *
 * This method of working gives sequences their laziness, because Sequence
 * values are consumed and operators applied to them only on demand. Values
 * generated by a sequence are not implicitly cached or stored. This means
 * that Sequences can even have infintely many items. Take for example this way
 * of expressing the concept of "the first n natural numbers:"
 *
 * <!-- runkit:activate
 *   { "preamble": "const { Range } = require('sequins');" }
 * -->
 * ```js
 * function naturals(n) {
 *   return Range(1, Infinity).slice(0, n).as(Array)
 * }
 * naturals(3); // [1, 2, 3]
 * ```
 * We move smoothly past our inability to store a list of infinite size,
 * because slice will only ever request three values from Range.
 *
 * Because seuqences need not cache intermediate states, they shine when
 * working with multiple transforms on lists which may not be infinite but
 * are simply very large. In practical terms they allow the programmer to
 * reduce memory usage at the cost of CPU cycles.
 *
 * Finally, Sequence is often used to provide a rich collection API to JavaScript
 * Object.
 *
 * ```js
 * Seq({ x: 0, y: 1, z: 2 }).map(v => v * 2).as(Object);
 * // { x: 0, y: 2, z: 4 }
 * ```
 */
export interface Sequence<K, V> extends Collection<K, V> {
  // Sequence algorithms

  /**
   * Returns a new Sequence with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Seq } = require('sequins');" }
   * -->
   * ```js
   * Seq([ 1, 2 ]).map(x => 10 * x)
   * // Seq [ 10, 20 ]
   * ```
   */
  map<M>(mapper: (value: V, key: K) => M): Sequence<K, M>;

  /**
   * Returns a new Sequence with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Seq } = require('sequins');" }
   * -->
   * ```js
   * Seq([ 1, 2 ]).map(x => 10 * x)
   * // Seq [ 10, 20 ]
   * ```
   *
   * Note: used only for sets.
   */
  map<M>(mapper: (value: V, key: K) => M): Sequence<M, M>;

  /**
   * Flat-maps the Sequence, returning a Sequence of the same type.
   *
   * Similar to `seq.map(...).flatten(true)`.
   */
  flatMap<M>(mapper: (value: V, key: K) => Iterable<M>): Sequence<K, M>;
  flatMap<M>(mapper: (value: V, key: K) => Iterable<M>): Sequence<M, M>;

  /**
   * Returns a new Sequence with only the values for which the `predicate`
   * function returns true.
   */
  filter<F extends V>(
    predicate: (value: V, key: K) => value is F
  ): Sequence<K, F>;
  filter(predicate: (value: V, key: K) => any): this;
}

/**
 * Collection is the base type for all Sequins structures. There are two
 * fundamental Collection types: Concrete and Sequence. The distinction is that
 * a `Concrete` stores its data, while a `Sequence` computes it.
 * Furthermore, all Collections have keys and values of some kind. Values are
 * similar everywhere, but the nature of keys is determined by the Collection's
 * subtype. Key may be explicitly declared ( `Keyed` subtype), the index of the
 * item in the collection ( `Indexed` subtype), or just the value again as a
 * placeholder ( `Duplicated` subtype).
 */
export interface Collection<K, V> {
  // Sequence algorithms

  /**
   * Returns a new Collection of the same type with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Collection } = require('sequins');" }
   * -->
   * ```js
   * Collection({ a: 1, b: 2 }).map(x => 10 * x)
   * // Sequence { "a": 10, "b": 20 }
   * ```
   */
  map<M>(mapper: (value: V, key: K, iter?: this) => M): Collection<K, M>;

  /**
   * Note: used only for sets, which return Collection<M, M> but are otherwise
   * identical to normal `map()`.
   *
   * @ignore
   */
  map<M>(...args: never[]): any;

  /**
   * Returns a new Collection of the same type with only the entries for which
   * the `predicate` function returns true.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * new Map({ a: 1, b: 2, c: 3, d: 4}).filter(x => x % 2 === 0)
   * // Map { "b": 2, "d": 4 }
   * ```
   */
  filter<F extends V>(
    predicate: (value: V, key: K, iter?: this) => value is F
  ): Collection<K, F>;
  filter(predicate: (value: V, key: K, iter?: this) => any): this;

  /**
   * Returns a new Collection of the same type with only the entries for which
   * the `predicate` function returns false.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * new Map({ a: 1, b: 2, c: 3, d: 4}).filterNot(x => x % 2 === 0)
   * // Map { "a": 1, "c": 3 }
   * ```
   */
  filterNot(predicate: (value: V, key: K, iter?: this) => boolean): this;

  /**
   * Reverses the order of elements in the collection.
   */
  reverse(): this;

  /**
   * Stably sorts the elements of the collection by using a `comparator`.
   *
   * If a `comparator` is not provided, a default comparator uses `<` and `>`.
   *
   * `comparator(valueA, valueB)`:
   *
   *   * Returns `0` if the elements should not be swapped.
   *   * Returns `-1` (or any negative number) if `valueA` comes before `valueB`
   *   * Returns `1` (or any positive number) if `valueA` comes after `valueB`
   *   * Is pure, i.e. it must always return the same value for the same pair
   *     of values.
   *
   * When sorting collections which have no defined order, their ordered
   * equivalents will be returned. e.g. `map.sort()` returns OrderedMap.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { Map } = require('sequins');" }
   * -->
   * ```js
   * new Map({ "c": 3, "a": 1, "b": 2 }).sort((a, b) => {
   *   if (a < b) { return -1; }
   *   if (a > b) { return 1; }
   *   if (a === b) { return 0; }
   * });
   * // Map { "a": 1, "b": 2, "c": 3 }
   * ```
   */
  sort(comparator?: (valueA: V, valueB: V) => number): this;

  /**
   * Like `sort`, but also accepts a `comparatorValueMapper` which allows for
   * sorting by more sophisticated means:
   *
   *     hitters.sortBy(hitter => hitter.avgHits)
   */
  sortBy<C>(
    comparatorValueMapper: (value: V, key: K, iter?: this) => C,
    comparator?: (valueA: C, valueB: C) => number
  ): this;

  /**
   * Returns a `Keyed` of `Keyeds`, grouped by the return
   * value of the `grouper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { List, Map } = require('sequins');" }
   * -->
   * ```js
   * const listOfMaps = new List([
   *   new Map({ v: 0 }),
   *   new Map({ v: 1 }),
   *   new Map({ v: 1 }),
   *   new Map({ v: 0 }),
   *   new Map({ v: 2 })
   * ])
   * const groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))
   * // Map {
   * //   0: List [ new Map{ "v": 0 }, new Map { "v": 0 } ],
   * //   1: List [ new Map{ "v": 1 }, new Map { "v": 1 } ],
   * //   2: List [ new Map{ "v": 2 } ],
   * // }
   * ```
   */
  groupBy<G>(
    grouper: (value: V, key: K, iter?: this) => G
  ): /*Map*/ KeyedSequence<G, /*this*/ Collection<K, V>>;

  // Side effects

  /**
   * The `sideEffect` is executed for every entry in the Collection.
   * `forEach` has no return value!
   */
  forEach(sideEffect: (value: V, key: K, iter?: this) => any): void;

  /**
   * The `sideEffect` is executed for entries in the Collection.
   *
   * If any call of `sideEffect` returns
   * `false`, the iteration will stop. Returns the number of entries iterated
   * (including the last iteration which returned false).
   */
  forSome(sideEffect: (value: V, key: K, iter?: this) => any): number;

  // Creating subsets

  /**
   * Returns a new Collection of the same type representing a portion of this
   * Collection from start up to but not including end.
   *
   * If begin is negative, it is offset from the end of the Collection. e.g.
   * `slice(-2)` returns a Collection of the last two entries. If it is not
   * provided the new Collection will begin at the beginning of this Collection.
   *
   * If end is negative, it is offset from the end of the Collection. e.g.
   * `slice(0, -1)` returns a Collection of everything but the last entry. If
   * it is not provided, the new Collection will continue through the end of
   * this Collection.
   *
   * If the requested slice is equivalent to the current Collection, then it
   * will return itself.
   */
  slice(begin?: number, end?: number): this;

  // Combination

  /**
   * Returns a new Collection of the same type with other values and
   * collection-like concatenated to this one.
   *
   * For Seqs, all entries will be present in the resulting Sequence, even if they
   * have the same key.
   */
  concat(...valuesOrCollections: Array<any>): Collection<any, any>;

  /**
   * Flattens nested Collections.
   *
   * Will deeply flatten the Collection by default, returning a Collection of the
   * same type, but a `depth` can be provided in the form of a number or
   * boolean (where true means to shallowly flatten one level). A depth of 0
   * (or shallow: false) will deeply flatten.
   *
   * Flattens only others Collection, not Arrays or Objects.
   *
   * Note: `flatten(true)` operates on Collection<any, Collection<K, V>> and
   * returns Collection<K, V>
   */
  flatten(depth?: number): Collection<any, any>;
  flatten(shallow?: boolean): Collection<any, any>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   */
  flatMap<M>(
    mapper: (value: V, key: K, iter?: this) => Iterable<M>
  ): Collection<K, M>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   * Used for Dictionaries only.
   */
  flatMap<KM, VM>(
    mapper: (value: V, key: K, iter?: this) => Iterable<[KM, VM]>
  ): Collection<KM, VM>;

  // Reducing a value

  /**
   * Reduces the Collection to a value by calling the `reducer` for every entry
   * in the Collection and passing along the reduced value.
   *
   * If `initialReduction` is not provided, the first item in the
   * Collection will be used.
   *
   * @see `Array#reduce`.
   */
  reduce<R>(
    reducer: (reduction: R, value: V, key: K, iter?: this) => R,
    initialReduction: R
  ): R;
  reduce<R>(reducer: (reduction: V | R, value: V, key: K, iter?: this) => R): R;

  /**
   * True if `predicate` returns true for all entries in the Collection.
   */
  every(predicate: (value: V, key: K, iter?: this) => boolean): boolean;

  /**
   * True if `predicate` returns true for any entry in the Collection.
   */
  some(predicate: (value: V, key: K, iter?: this) => boolean): boolean;

  /**
   * Returns the size of this Collection by iterating through it.
   *
   * If a `predicate` is provided, returns the count of entries in the
   * Sequence for which the `predicate` returns true.
   *
   * NOTE: For concrete collections, this returns size when no args
   * are passed. For sequences it must always iterate over the whole
   * collection.
   */
  count(): number;
  count(predicate: (value: V, key: K, iter?: this) => boolean): number;

  // Search for value

  /**
   * Returns the first value for which the `predicate` returns true.
   */
  find(
    predicate: (value: V, key: K, iter?: this) => boolean,
    notSetValue?: V
  ): V | undefined;

  // Conversions

  /**
   * Converts this collection into the type of collection specified as the
   * `CollectionConstructor` parameter. If no conversion is neccessary, returns
   *  the original instance. The easiest way to describe the function is to show
   * some example usages:
   *
   * ```js
   * import {List, Map, Set, IndexedSequence, KeyedSequence, SetSequence, NativeMap, NativeSet} from 'sequins';
   * const list = new List([1, 2, 3]);
   * list.to(Map) // Map{0 => 1, 1 => 2, 2 => 3}
   * list.to(Set) // Set{1, 2, 3}
   * list.to(List) // list
   * list.to(IndexedSequence) // new IndexedSequence(list)
   * list.to(KeyedSequence) // new KeyedSequence(list)
   * list.to(SetSequence) // new SetSequence(list)
   * list.to(NativeMap) // NativeMap{0 => 1, 1 => 2, 2 => 3}
   * list.to(NativeMap) instanceof global.Map // true
   * list.to(NativeSet) // NativeSet{1, 2, 3}
   * list.to(NativeSet) instanceof global.Set // true
   * list.to(Array) // [1, 2, 3]
   * list.to(Object) // {'0': 1, '1': 2, '2': 3}
   * ```
   *
   *
   * While you can find definitive information in the constructor references,
   * the basics are that keys will be discarded when converting from a `Keyed`
   * to anything other than a `Keyed`. When converting an `Indexed` to a
   * `Keyed`, the indexes will become the keys. When converting a `Duplicated`
   * to a keyed, the keys will be the same as the values.
   *
   * @pragma showExampleAboveType
   */

  to(Type: { new (): IndexedSequence<any> }): IndexedSequence<V>;
  to(Type: { new (): KeyedSequence<any, any> }): KeyedSequence<K, V>;
  to(Type: { new (): SetSequence<any> }): SetSequence<V>;
  to(Type: { new (): List<any> }): List<V>;
  to(Type: { new (): Map<any, any> }): Map<K, V>;
  to(Type: { new (): Set<any> }): Set<V>;
  to(Type: { new (): NativeMap<any, any> }): NativeMap<K, V>;
  to(Type: { new (): NativeSet<any> }): NativeSet<V>;
  to(Type: { new (): Array<any> }): Array<V>;
  to(Type: { prototype: Object }): { [key: string]: V };

  /**
   * Converts this collection to `Map` if it is `Keyed`, `List` if it is
   * `Indexed`, or `Set` if it is `Duplicated`.
   * or
   */
  toConcrete(): Concrete<K, V>;

  /**
   * Converts this Collection to a Sequence of the same kind (`Indexed`,
   * `Keyed`, or `Duplicated`).
   */
  toSeq(): Sequence<K, V>;

  /**
   * Deeply converts this Collection to equivalent native JavaScript Array or Object.
   *
   * `Indexed`, and `Duplicated` become `Array`, while
   * `Keyed` becomes `Object`, converting keys to Strings.
   */
  toJS(): Array<any> | { [key: string]: any };

  /**
   * Shallowly converts this Collection to equivalent native JavaScript Array or Object.
   *
   * `Indexed`, and `Duplicated` become `Array`, while
   * `Keyed` becomes `Object`, converting keys to Strings.
   */
  toJSON(): Array<V> | { [key: string]: V };

  // Iterables

  /**
   * Returns a `SetSequence` of the collection's keys, which is also suitable for
   * use as an es6 iterable over the collection's keys.
   */
  keys(): SetSequence<K>;

  /**
   * Returns a `SetSequence` of the collection's values, which is also suitable
   * for use as an es6 iterable over the collection's values.
   */
  values(): SetSequence<V>;

  /**
   * Returns a `KeyedSequence` of the collection's entries, which is also suitable
   * for use as an es6 iterable over the collection's `[key, value]` entry tuples.
   */
  entries(): KeyedSequence<K, V>;
}

// Subtypes

/**
 * Keyed is used to describe Collections which have explicit keys and values.
 * Callbacks for methods in classes implementing Keyed will receive
 * `(value, key)` as thier first two arguments.
 *
 * Iterating over a `Keyed`, yields `[K, V]` tuples.
 */
export interface Keyed<K, V> extends Collection<K, V> {
  /**
   * Deeply converts this Keyed collection to equivalent native JavaScript Object.
   *
   * Converts keys to Strings.
   */
  toJS(): Object;

  /**
   * Shallowly converts this Keyed collection to equivalent native JavaScript Object.
   *
   * Converts keys to Strings.
   */
  toJSON(): { [key: string]: V };

  /**
   * Converts this collection to a `Map`
   */
  toConcrete(): Map<K, V>;

  /**
   * Returns KeyedSequence.
   * @override
   */
  toSeq(): KeyedSequence<K, V>;

  // Sequence functions

  /**
   * Returns a new Keyed of the same type where the keys and values
   * have been flipped.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { KeyedSequence } = require('sequins');" }
   * -->
   * ```js
   * new KeyedSequence({ a: 'z', b: 'y' }).flip()
   * // KeyedSequence { "z": "a", "y": "b" }
   * ```
   */
  flip(): Keyed<V, K>;

  /**
   * Returns a new Collection with other collections concatenated to this one.
   */
  concat<KC, VC>(
    ...collections: Array<Iterable<[KC, VC]>>
  ): Keyed<K | KC, V | VC>;
  concat<C>(
    ...collections: Array<{ [key: string]: C }>
  ): Keyed<K | string, V | C>;

  /**
   * Returns a new Keyed with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { KeyedSequence } = require('sequins');" }
   * -->
   * ```js
   * new KeyedSequence({ a: 1, b: 2 }).map(x => 10 * x)
   * // KeyedSequence { "a": 10, "b": 20 }
   * ```
   */
  map<M>(mapper: (value: V, key: K, iter?: this) => M): Keyed<K, M>;

  /**
   * Returns a new Keyed of the same type with keys passed through
   * a `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { KeyedSequence } = require('sequins');" }
   * -->
   * <!-- runkit:activate -->
   * ```js
   * new KeyedSequence({ a: 1, b: 2 }).mapKeys(x => x.toUpperCase())
   * // KeyedSequence { "A": 1, "B": 2 }
   * ```
   */
  mapKeys<M>(mapper: (key: K, value: V, iter?: this) => M): Keyed<M, V>;

  /**
   * Returns a new Keyed of the same type with entries
   * ([key, value] tuples) passed through a `mapper` function.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { KeyedSequence } = require('sequins');" }
   * -->
   * ```js
   * new KeyedSequence({ a: 1, b: 2 })
   *   .mapEntries(([ k, v ]) => [ k.toUpperCase(), v * 2 ])
   * // KeyedSequence { "A": 2, "B": 4 }
   * ```
   */
  mapEntries<KM, VM>(
    mapper: (entry: [K, V], index: number, iter?: this) => [KM, VM]
  ): Keyed<KM, VM>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   */
  flatMap<KM, VM>(
    mapper: (value: V, key: K, iter?: this) => Iterable<[KM, VM]>
  ): Keyed<KM, VM>;

  /**
   * Returns a new Collection with only the values for which the `predicate`
   * function returns true.
   */
  filter<F extends V>(
    predicate: (value: V, key: K, iter?: this) => value is F
  ): Keyed<K, F>;
  filter(predicate: (value: V, key: K, iter?: this) => any): this;

  [Symbol.iterator](): IterableIterator<[K, V]>;
}

/**
 * Indexed is used to describe Collections of values where the collections
 * also track the indexes of those values. Callbacks for methods in classes
 * implementing Indexed will receive `(value, index)` as their first two
 * arguments.
 *
 * Iterating over an `Indexed` yields only values, no indexes.
 *
 * Unlike JavaScript arrays, `Indexed` collections are always dense. "Unset"
 * indices and `undefined` indices are indistinguishable, and all indices from
 * 0 to `size` are visited when iterated.
 */
export interface Indexed<T> extends Collection<number, T> {
  /**
   * Deeply converts this Indexed collection to equivalent native JavaScript Array.
   */
  toJS(): Array<any>;

  /**
   * Shallowly converts this Indexed collection to equivalent native JavaScript Array.
   */
  toJSON(): Array<T>;

  /**
   * Converts this collection to a `List`
   */
  toConcrete(): List<T>;

  // Reading values

  /**
   * Returns the value associated with the provided index, or notSetValue if
   * the index is beyond the bounds of the Collection.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * Collection. `s.get(-1)` gets the last item in the Collection.
   */
  get<NSV>(index: number, notSetValue: NSV): T | NSV;
  get(index: number): T | undefined;

  // Conversions

  /**
   * Returns IndexedSequence.
   * @override
   */
  toSeq(): IndexedSequence<T>;

  // Combination

  /**
   * Returns a Collection of the same type "zipped" with the provided
   * collections.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   *
   * <!-- runkit:activate
   *   { "preamble": "const { IndexedSequence } = require('sequins');" }
   * -->
   * ```js
   * const a = new IndexedSequence([ 1, 2, 3 ]);
   * const b = new IndexedSequence([ 4, 5, 6 ]);
   * const c = a.zip(b); // IndexedSequence [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: CollectionLike<any, U>): Indexed<[T, U]>;
  zip<U, V>(
    other: CollectionLike<any, U>,
    other2: CollectionLike<any, V>
  ): Indexed<[T, U, V]>;
  zip(...collections: Array<CollectionLike<any, any>>): Indexed<any>;

  /**
   * Returns a Collection "zipped" with the provided collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * <!-- runkit:activate
   *   { "preamble": "const { IndexedSequence } = require('sequins');" }
   * -->
   * ```js
   * const a = new IndexedSequence([ 1, 2 ]);
   * const b = new IndexedSequence([ 3, 4, 5 ]);
   * const c = a.zipAll(b);
   * // IndexedSequence [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   */
  zipAll<U>(other: CollectionLike<any, U>): Indexed<[T, U]>;
  zipAll<U, V>(
    other: CollectionLike<any, U>,
    other2: CollectionLike<any, V>
  ): Indexed<[T, U, V]>;
  zipAll(...collections: Array<CollectionLike<any, any>>): Indexed<any>;

  /**
   * Returns a Collection of the same type "zipped" with the provided
   * collections by using a custom `zipper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { IndexedSequence } = require('sequins')" }
   * -->
   * ```js
   * const a = new IndexedSequence([ 1, 2, 3 ]);
   * const b = new IndexedSequence([ 4, 5, 6 ]);
   * const c = a.zipWith((a, b) => a + b, b);
   * // IndexedSequence [ 5, 7, 9 ]
   * ```
   */
  zipWith<U, Z>(
    zipper: (value: T, otherValue: U) => Z,
    otherCollection: CollectionLike<any, U>
  ): Indexed<Z>;
  zipWith<U, V, Z>(
    zipper: (value: T, otherValue: U, thirdValue: V) => Z,
    otherCollection: CollectionLike<any, U>,
    thirdCollection: CollectionLike<any, V>
  ): Indexed<Z>;
  zipWith<Z>(
    zipper: (...any: Array<any>) => Z,
    ...collections: Array<CollectionLike<any, any>>
  ): Indexed<Z>;

  // Sequence algorithms

  /**
   * Returns a new Collection with other collections concatenated to this one.
   */
  concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Indexed<T | C>;

  /**
   * Returns a new Indexed with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { IndexedSequence } = require('sequins')" }
   * -->
   * ```js
   * new IndexedSequence([1,2]).map(x => 10 * x)
   * // IndexedSequence [ 1, 2 ]
   * ```
   */
  map<M>(mapper: (value: T, key: number) => M): Indexed<M>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   */
  flatMap<M>(mapper: (value: T, key: number) => Iterable<M>): Indexed<M>;

  /**
   * Returns a new Collection with only the values for which the `predicate`
   * function returns true.
   */
  filter<F extends T>(
    predicate: (value: T, index: number) => value is F
  ): Indexed<F>;
  filter(predicate: (value: T, index: number) => any): this;

  [Symbol.iterator](): IterableIterator<T>;
}

/**
 * Duplicated describes collections of values where no index is desired.
 * Instead, callbacks for methods in classes implementing Duplicated will
 * receive `(value, value)` as their first two arguments, which is the source
 * of the name.
 *
 * Iterating over a Duplicated yields only values.
 */
export interface Duplicated<T> extends Collection<T, T> {
  /**
   * Deeply converts this Set collection to equivalent native JavaScript Array.
   */
  toJS(): Array<any>;

  /**
   * Shallowly converts this Set collection to equivalent native JavaScript Array.
   */
  toJSON(): Array<T>;

  /**
   * Converts this collection to a `Set`
   */
  toConcrete(): Set<T>;

  /**
   * Returns SetSequence.
   * @override
   */
  toSeq(): SetSequence<T>;

  // Sequence algorithms

  /**
   * Returns a new Collection with other collections concatenated to this one.
   */
  concat<U>(...collections: Array<Iterable<U>>): Duplicated<T | U>;

  /**
   * Returns a new Duplicated with values passed through a
   * `mapper` function.
   *
   * ```
   * Duplicated([ 1, 2 ]).map(x => 10 * x)
   * // Sequence { 1, 2 }
   * ```
   */
  map<M>(mapper: (value: T, key: T) => M): Duplicated<M>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   */
  flatMap<M>(mapper: (value: T, key: T) => Iterable<M>): Duplicated<M>;

  /**
   * Returns a new Collection with only the values for which the `predicate`
   * function returns true.
   */
  filter<F extends T>(
    predicate: (value: T, key: T) => value is F
  ): Duplicated<F>;
  filter(predicate: (value: T, key: T) => any): this;

  [Symbol.iterator](): IterableIterator<T>;
}

// Construction

/**
 * Returns a IndexedSequence of numbers from `start` (inclusive) to `end`
 * (exclusive), by `step`, where `start` defaults to 0, `step` to 1, and `end` to
 * infinity. When `start` is equal to `end`, returns empty range.
 *
 * ```js
 * Range() // [ 0, 1, 2, 3, ... ]
 * Range(10) // [ 10, 11, 12, 13, ... ]
 * Range(10, 15) // [ 10, 11, 12, 13, 14 ]
 * Range(10, 30, 5) // [ 10, 15, 20, 25 ]
 * Range(30, 10, 5) // [ 30, 25, 20, 15 ]
 * Range(30, 30, 5) // []
 * ```
 */
export function Range(
  start?: number,
  end?: number,
  step?: number
): IndexedSequence<number>;

/**
 * Returns a IndexedSequence of `value` repeated `times` times. When `times` is
 * not defined, returns an infinite `Sequence` of `value`.
 *
 * ```js
 * Repeat('foo') // [ 'foo', 'foo', 'foo', ... ]
 * Repeat('bar', 4) // [ 'bar', 'bar', 'bar', 'bar' ]
 * ```
 */
export function Repeat<T>(value: T, times?: number): IndexedSequence<T>;

// Utility

/**
 * True if `maybeCollection` is a Collection, or any of its subclasses.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { isCollection, Map, List } = require('sequins')" }
 * -->
 * ```js
 * isCollection([]); // false
 * isCollection({}); // false
 * isCollection(new Map()); // true
 * isCollection(new List()); // true
 * ```
 */
export function isCollection(
  maybeCollection: any
): maybeCollection is Collection<any, any>;

/**
 * True if `maybeKeyed` is a Keyed, or any of its subclasses.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { isKeyed, Map, List } = require('sequins')" }
 * -->
 * ```js
 * isKeyed([]); // false
 * isKeyed({}); // false
 * isKeyed(new Map()); // true
 * isKeyed(new List()); // false
 * ```
 */
export function isKeyed(maybeKeyed: any): maybeKeyed is Keyed<any, any>;

/**
 * True if `maybeIndexed` is an Indexed, or any of its subclasses.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { isIndexed, Map, List } = require('sequins')" }
 * -->
 * ```js
 * isIndexed([]); // false
 * isIndexed({}); // false
 * isIndexed(new Map()); // false
 * isIndexed(new List()); // true
 * isIndexed(new Set()); // false
 * ```
 */
export function isIndexed(maybeIndexed: any): maybeIndexed is Indexed<any>;

/**
 * True if `maybeAssociative` is either a Keyed or Indexed Collection.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { isAssociative, Map, List } = require('sequins')" }
 * -->
 * ```js
 * isAssociative([]); // false
 * isAssociative({}); // false
 * isAssociative(new Map()); // true
 * isAssociative(new List()); // true
 * isAssociative(new Set()); // false
 * ```
 */
export function isAssociative(
  maybeAssociative: any
): maybeAssociative is Keyed<any, any> | Indexed<any>;

/**
 * True if `maybeSeq` is a Sequence.
 */
export function isSeq(
  maybeSeq: any
): maybeSeq is
  | IndexedSequence<any>
  | KeyedSequence<any, any>
  | SetSequence<any>;

/**
 * True if `maybeList` is a List.
 */
export function isList(maybeList: any): maybeList is List<any>;

/**
 * True if `maybeMap` is a Map.
 *
 * Also true for OrderedMaps.
 */
export function isMap(maybeMap: any): maybeMap is Map<any, any>;

/**
 * True if `maybeSet` is a Set.
 *
 * Also true for OrderedSets.
 */
export function isSet(maybeSet: any): maybeSet is Set<any>;

/**
 * Returns the value within the provided collection associated with the
 * provided key, or notSetValue if the key is not defined in the collection.
 *
 * A functional alternative to `collection.get(key)` which will also work on
 * plain Objects and Arrays as an alternative for `collection[key]`.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { get } = require('sequins')" }
 * -->
 * ```js
 * get([ 'dog', 'frog', 'cat' ], 2) // 'frog'
 * get({ x: 123, y: 456 }, 'x') // 123
 * get({ x: 123, y: 456 }, 'z', 'ifNotSet') // 'ifNotSet'
 * ```
 */
export function get<K, V>(collection: Collection<K, V>, key: K): V | undefined;
export function get<K, V, NSV>(
  collection: Collection<K, V>,
  key: K,
  notSetValue: NSV
): V | NSV;
export function get<V>(collection: Array<V>, key: number): V | undefined;
export function get<V, NSV>(
  collection: Array<V>,
  key: number,
  notSetValue: NSV
): V | NSV;
export function get<C extends Object, K extends keyof C>(
  object: C,
  key: K,
  notSetValue: any
): C[K];
export function get<V>(
  collection: { [key: string]: V },
  key: string
): V | undefined;
export function get<V, NSV>(
  collection: { [key: string]: V },
  key: string,
  notSetValue: NSV
): V | NSV;

/**
 * Returns true if the key is defined in the provided collection.
 *
 * A functional alternative to `collection.has(key)` which will also work with
 * plain Objects and Arrays as an alternative for
 * `collection.hasOwnProperty(key)`.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { has } = require('sequins')" }
 * -->
 * ```js
 * has([ 'dog', 'frog', 'cat' ], 2) // true
 * has([ 'dog', 'frog', 'cat' ], 5) // false
 * has({ x: 123, y: 456 }, 'x') // true
 * has({ x: 123, y: 456 }, 'z') // false
 * ```
 */
export function has(collection: Object, key: any): boolean;

/**
 * Removes the key at value
 *
 * A functional alternative to `collection.remove(key)` which will also work
 * with plain Objects and Arrays as an alternative for
 * `delete collectionCopy[key]`.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { remove } = require('sequins')" }
 * -->
 * ```js
 * const array = [ 'dog', 'frog', 'cat' ]
 * remove(array, 1)
 * console.log(array) // [ 'dog', 'cat' ]
 *
 * const object = { x: 123, y: 456 }
 * remove(object, 'x')
 * console.log(object) // { y: 456 }
 * ```
 */
export function remove<K, C extends Collection<K, any>>(
  collection: C,
  key: K
): C;
export function remove<C extends Array<any>>(collection: C, key: number): C;
export function remove<C, K extends keyof C>(collection: C, key: K): C;
export function remove<C extends { [key: string]: any }, K extends keyof C>(
  collection: C,
  key: K
): C;

/**
 * Sets key to value
 *
 * A functional alternative to `collection.set(key, value)` which will also
 * work with plain Objects and Arrays as an alternative for
 * `collectionCopy[key] = value`.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { set } = require('sequins')" }
 * -->
 * ```js
 * const array = [ 'dog', 'frog', 'cat' ]
 * set(array, 1, 'cow')
 * console.log(array) // [ 'dog', 'cow', 'cat' ]
 *
 * const object = { x: 123, y: 456 }
 * set(object, 'x', 789)
 * console.log(object) // { x: 123, y: 456 }
 * ```
 */
export function set<K, V, C extends Collection<K, V>>(
  collection: C,
  key: K,
  value: V
): C;
export function set<V, C extends Array<V>>(
  collection: C,
  key: number,
  value: V
): C;
export function set<C, K extends keyof C>(object: C, key: K, value: C[K]): C;
export function set<V, C extends { [key: string]: V }>(
  collection: C,
  key: string,
  value: V
): C;

/**
 * Gets the keys of a Collection, Object, or Array.
 */
export function keys(shape: { [key: string]: any }): SetSequence<string>;
export function keys(shape: Array<any>): SetSequence<number>;
export function keys<K>(shape: NativeMap<K, any>): SetSequence<K>;
export function keys<V>(shape: NativeSet<V>): SetSequence<V>;
export function keys<K>(shape: Collection<K, any>): SetSequence<K>;

/**
 * Gets the value of a Collection, Object, or Array.
 */
export function values<V>(shape: { [key: string]: V }): SetSequence<V>;
export function values<V>(shape: Array<V>): SetSequence<V>;
export function values<V>(shape: NativeMap<any, V>): SetSequence<V>;
export function values<V>(shape: NativeSet<V>): SetSequence<V>;
export function values<V>(shape: Collection<any, V>): SetSequence<V>;

/**
 * Gets the entries of a Collection, Object, or Array.
 */
export function entries<V>(shape: { [key: string]: V }): SetSequence<[string, V]>; // prettier-ignore
export function entries<V>(shape: Array<V>): SetSequence<[number, V]>;
export function entries<K, V>(shape: NativeMap<K, V>): SetSequence<[K, V]>;
export function entries<V>(shape: NativeSet<V>): SetSequence<[V, V]>;
export function entries<K, V>(shape: Collection<K, V>): SetSequence<[K, V]>;
