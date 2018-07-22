import IndexedSeq from '../sequence-indexed';
import KeyedSeq from '../sequence-keyed';
import SetSeq from '../sequence-set';

describe('Seq.Keyed', function() {
  describe('basic functionality', function() {
    let calls;
    let values;
    let keys;
    let keyed;
    let entries;

    beforeEach(function() {
      values = [1, 2, 3];
      keys = [9, 8, 7];
      entries = [[9, 1], [8, 2], [7, 3]];
      calls = [[1, 9], [2, 8], [3, 7]];
      keyed = new KeyedSeq(entries);
    });

    it('has the identity property', function() {
      expect(Array.from(keyed)).toEqual(entries);
    });

    it('can concat', function() {
      const a = [[1, 2], [2, 3]];
      const b = [[3, 4], [4, 5]];
      expect(Array.from(new KeyedSeq(a).concat(b))).toEqual([...a, ...b]);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(keyed.map(mapMockFn))).toEqual([[9, 2], [8, 3], [7, 4]]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can mapKeys', function() {
      const mapFn = key => key - 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(keyed.mapKeys(mapMockFn))).toEqual([[8, 1], [7, 2], [6, 3]]);
      expect(mapMockFn.mock.calls).toEqual(entries);
    });

    it('can mapEntries', function() {
      const mapFn = ([key, val]) => [val, key];
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(keyed.mapEntries(mapMockFn))).toEqual([[1, 9], [2, 8], [3, 7]]);
      expect(mapMockFn.mock.calls).toEqual([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]]);
    });

    it('can flatMap KeyedSequences', function() {
      const mapFn = val => new KeyedSeq([[val + 1, val + 2]]);
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(keyed.flatMap(mapMockFn))).toEqual([[2, 3], [3, 4], [4, 5]]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can flatMap Maps', function() {
      const mapFn = val => new Map([[val + 1, val + 2]]);
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(keyed.flatMap(mapMockFn))).toEqual([[2, 3], [3, 4], [4, 5]]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can tap', function() {
      const tapFn = jest.fn();
      Array.from(keyed.tap(tapFn));
      expect(tapFn.mock.calls).toEqual(calls);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(keyed.filter(filterMockFn))).toEqual(entries.slice(1));
      expect(filterMockFn.mock.calls).toEqual(calls);
    });

    it('can filterNot', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(keyed.filterNot(filterMockFn))).toEqual(entries.slice(0, 1));
      expect(filterMockFn.mock.calls).toEqual(calls);
    });

    it('can reverse', function() {
      expect(Array.from(keyed.reverse())).toEqual([...entries].reverse());
    });

    it('can reduce', function() {
      const reducer = (acc, val, key) => acc + val;
      const reducerMockFn = jest.fn(reducer);
      expect(keyed.reduce(reducerMockFn)).toBe(6);
      expect(reducerMockFn.mock.calls).toEqual([[1, 2, 8], [3, 3, 7]]);
    });

    it('can forEach', function() {
      const eachFn = jest.fn();
      expect(keyed.forEach(eachFn)).toBe(3);
      expect(eachFn.mock.calls).toEqual(calls);
    });

    it('can be converted to IndexedSeq (noop)', function() {
      const indexed = keyed.toIndexedSeq();
      expect(Array.from(indexed)).toEqual(values);
      expect(indexed).toBeInstanceOf(IndexedSeq);
    });

    it('can be converted to KeyedSeq (noop)', function() {
      expect(keyed.toKeyedSeq()).toBe(keyed);
    });

    it('can be converted to SetSeq', function() {
      const set = keyed.toSetSeq();
      expect(Array.from(set)).toEqual(values);
      expect(set).toBeInstanceOf(SetSeq);
    });

    it('can be converted to Array', function() {
      expect(keyed.toArray()).toEqual(values);
    });

    it('can be converted to Object', function() {
      expect(keyed.toObject()).toEqual({ 9: 1, 8: 2, 7: 3 });
    });

    it('can be converted to Map', function() {
      expect(keyed.toMap()).toEqual(new Map(keyed));
    });

    it('can be converted to Set', function() {
      expect(keyed.toSet()).toEqual(new Set(values));
    });

    it('can be converted to native', function() {
      expect(keyed.toNative()).toEqual(keyed.toMap());
    });

    it('has keys iterator', function() {
      expect(Array.from(keyed.keys())).toEqual(keys);
    });

    it('has values iterator', function() {
      expect(Array.from(keyed.values())).toEqual(values);
    });

    it('has entries iterator', function() {
      expect(Array.from(keyed.entries())).toEqual(entries);
    });

    it('can be converted to a key sequence', function() {
      const keySeq = keyed.keySeq();
      expect(keySeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(keySeq)).toEqual(keys);
    });

    it('can be converted to a value sequence', function() {
      const valueSeq = keyed.valueSeq();
      expect(valueSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(valueSeq)).toEqual(values);
    });

    it('can be converted to an entries sequence', function() {
      const entriesSeq = keyed.entrySeq();
      expect(entriesSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(entriesSeq)).toEqual(entries);
    });
  });
});
