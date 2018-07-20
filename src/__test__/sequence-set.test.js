import { iter } from 'iter-tools';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import IndexedSeq from '../sequence-indexed';
import KeyedSeq from '../sequence-keyed';
import SetSeq from '../sequence-set';

describe('Seq.Set', function() {
  describe('basic functionality', function() {
    let array;
    let calls;
    let set;

    beforeAll(function() {
      array = [1, 2, 3];
      calls = [[1], [2], [3]];
    });

    beforeEach(function() {
      set = new SetSeq(array);
    });

    it('has the identity property', function() {
      expect(Array.from(set)).toEqual(array);
    });

    it('can concat', function() {
      expect(Array.from(new SetSeq([1, 2]).concat([3, 4]))).toEqual([1, 2, 3, 4]);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(set.map(mapMockFn))).toEqual(array.map(mapFn));
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can flatMap SetSequences', function() {
      const mapFn = val => new SetSeq([val + 1, val + 1.5]);
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(set.flatMap(mapMockFn))).toEqual([2, 2.5, 3, 3.5, 4, 4.5]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can tap', function() {
      const tapFn = jest.fn();
      Array.from(set.tap(tapFn));
      expect(tapFn.mock.calls).toEqual(calls);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(set.filter(filterMockFn))).toEqual(array.filter(filterFn));
      expect(filterMockFn.mock.calls).toEqual(calls);
    });

    it('can forEach', function() {
      const eachFn = jest.fn();
      expect(set.forEach(eachFn)).toBe(3);
      expect(eachFn.mock.calls).toEqual(calls);
    });

    it('can be converted to IndexedSeq', function() {
      const indexed = set.toIndexedSeq();
      expect(Array.from(indexed)).toEqual([1, 2, 3]);
      expect(indexed).toBeInstanceOf(IndexedSeq);
    });

    it('can be converted to KeyedSeq', function() {
      const keyed = set.toKeyedSeq();
      expect(Array.from(keyed)).toEqual([[1, 1], [2, 2], [3, 3]]);
      expect(keyed).toBeInstanceOf(KeyedSeq);
    });

    it('can be converted to SetSeq (noop)', function() {
      expect(set.toSetSeq()).toBe(set);
    });

    it('can be converted to Array', function() {
      expect(set.toArray()).toEqual(array);
    });

    it('can be converted to Object', function() {
      expect(set.toObject()).toEqual({ 1: 1, 2: 2, 3: 3 });
    });

    it('can be converted to Map', function() {
      expect(set.toMap()).toEqual(new Map([[1, 1], [2, 2], [3, 3]]));
    });

    it('can be converted to Set', function() {
      expect(set.toSet()).toEqual(new Set(array));
    });

    it('has keys iterator', function() {
      expect(Array.from(set.keys())).toEqual(array);
    });

    it('has values iterator', function() {
      expect(Array.from(set.values())).toEqual(array);
    });

    it('has entries iterator', function() {
      expect(Array.from(set.entries())).toEqual([[1, 1], [2, 2], [3, 3]]);
    });
  });
});
