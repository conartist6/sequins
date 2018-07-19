import { iter } from 'iter-tools';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import IndexedSeq from '../sequence-indexed';
import KeyedSeq from '../sequence-keyed';
import SetSeq from '../sequence-set';

describe('Seq.Indexed', function() {
  describe('basic functionality', function() {
    let array;
    let indexed;
    let calls;

    beforeAll(function() {
      calls = [[1, 0], [2, 1], [3, 2]];
    });

    beforeEach(function() {
      array = [1, 2, 3];
      indexed = new IndexedSeq(array);
    });

    it('has the identity property', function() {
      expect(Array.from(indexed)).toEqual(array);
    });

    it('can concat', function() {
      expect(Array.from(new IndexedSeq([1, 2]).concat([3, 4]))).toEqual([1, 2, 3, 4]);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(indexed.map(mapMockFn))).toEqual(array.map(mapFn));
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can flatMap IndexedSequences', function() {
      const mapFn = val => new IndexedSeq([val + 1, val + 1.5]);
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(indexed.flatMap(mapMockFn))).toEqual([2, 2.5, 3, 3.5, 4, 4.5]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can flatMap Arrays', function() {
      const mapFn = val => [val + 1, val + 1.5];
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(indexed.flatMap(mapMockFn))).toEqual([2, 2.5, 3, 3.5, 4, 4.5]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can forEach', function() {
      const eachFn = jest.fn();
      Array.from(indexed.forEach(eachFn));
      expect(eachFn.mock.calls).toEqual(calls);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(indexed.filter(filterMockFn))).toEqual(array.filter(filterFn));
      expect(filterMockFn.mock.calls).toEqual(calls);
    });

    it('can filterNot', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(indexed.filterNot(filterMockFn))).toEqual(
        array.filter(val => !filterFn(val)),
      );
      expect(filterMockFn.mock.calls).toEqual(calls);
    });

    it('can be converted to IndexedSeq (noop)', function() {
      expect(indexed.toIndexedSeq()).toBe(indexed);
    });

    it('can be converted to KeyedSeq', function() {
      const keyed = indexed.toKeyedSeq();
      expect(Array.from(keyed)).toEqual([[0, 1], [1, 2], [2, 3]]);
      expect(keyed).toBeInstanceOf(KeyedSeq);
    });

    it('can be converted to SetSeq', function() {
      const set = indexed.toSetSeq();
      expect(Array.from(set)).toEqual([1, 2, 3]);
      expect(set).toBeInstanceOf(SetSeq);
    });

    it('can be converted to Array', function() {
      expect(indexed.toArray()).toEqual(array);
    });

    it('can be converted to Object', function() {
      expect(indexed.toObject()).toEqual({ 0: 1, 1: 2, 2: 3 });
    });

    it('can be converted to Map', function() {
      expect(indexed.toMap()).toEqual(new Map([[0, 1], [1, 2], [2, 3]]));
    });

    it('can be converted to Set', function() {
      expect(indexed.toSet()).toEqual(new Set(indexed));
    });

    it('has keys iterator', function() {
      expect(Array.from(indexed.keys())).toEqual([0, 1, 2]);
    });

    it('has values iterator', function() {
      expect(Array.from(indexed.values())).toEqual(array);
    });

    it('has entries iterator', function() {
      expect(Array.from(indexed.entries())).toEqual([[0, 1], [1, 2], [2, 3]]);
    });
  });
});
