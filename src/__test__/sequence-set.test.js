import { iter } from 'iter-tools';
import IndexedSeq from '../sequence-indexed';
import KeyedSeq from '../sequence-keyed';
import SetSeq from '../sequence-set';

describe('Seq.Set', function() {
  describe('basic functionality', function() {
    let array;
    let iterator;

    beforeAll(function() {
      array = [1, 2, 3];
    });

    beforeEach(function() {
      iterator = iter(array);
    });

    it('has the identity property', function() {
      expect(Array.from(new SetSeq(iterator))).toEqual(array);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(new SetSeq(iterator).map(mapMockFn))).toEqual(array.map(mapFn));
      expect(mapMockFn.mock.calls).toEqual([[1], [2], [3]]);
    });

    it('can tap', function() {
      const tapFn = jest.fn();
      Array.from(new SetSeq(iterator).tap(tapFn));
      expect(tapFn.mock.calls).toEqual([[1], [2], [3]]);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(new SetSeq(iterator).filter(filterMockFn))).toEqual(array.filter(filterFn));
      expect(filterMockFn.mock.calls).toEqual([[1], [2], [3]]);
    });

    it('can be converted to IndexedSeq', function() {
      const indexed = new SetSeq([1, 2, 3]).toIndexedSeq();
      expect(Array.from(indexed)).toEqual([1, 2, 3]);
      expect(indexed).toBeInstanceOf(IndexedSeq);
    });

    it('can be converted to KeyedSeq', function() {
      const keyed = new SetSeq([1, 2, 3]).toKeyedSeq();
      expect(Array.from(keyed)).toEqual([[1, 1], [2, 2], [3, 3]]);
      expect(keyed).toBeInstanceOf(KeyedSeq);
    });

    it('can be converted to SetSeq (noop)', function() {
      const set = new SetSeq([1, 2, 3]);
      expect(set.toSetSeq()).toBe(set);
    });

    it('has keys iterator', function() {
      expect(Array.from(new SetSeq(iterator).keys())).toEqual(array);
    });

    it('has values iterator', function() {
      expect(Array.from(new SetSeq(iterator).values())).toEqual(array);
    });

    it('has entries iterator', function() {
      expect(Array.from(new SetSeq(iterator).entries())).toEqual([[1, 1], [2, 2], [3, 3]]);
    });
  });
});
