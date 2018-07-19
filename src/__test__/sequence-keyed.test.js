import { iter } from 'iter-tools';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
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

    it('has keys iterator', function() {
      expect(Array.from(keyed.keys())).toEqual(keys);
    });

    it('has values iterator', function() {
      expect(Array.from(keyed.values())).toEqual(values);
    });

    it('has entries iterator', function() {
      expect(Array.from(keyed.entries())).toEqual(entries);
    });
  });
});
