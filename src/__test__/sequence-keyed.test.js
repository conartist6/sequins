import { iter } from 'iter-tools';
import IndexedSeq from '../sequence-indexed';
import KeyedSeq from '../sequence-keyed';
import SetSeq from '../sequence-set';

describe('Seq.Keyed', function() {
  describe('basic functionality', function() {
    let array;
    let entriesArray;
    let iterator;

    beforeEach(function() {
      array = [1, 2, 3];
      entriesArray = [[1, 1], [2, 2], [3, 3]];
      iterator = iter(entriesArray);
    });

    it('has the identity property', function() {
      expect(Array.from(new KeyedSeq(iterator))).toEqual(entriesArray);
    });

    it('can concat', function() {
      const a = [[1, 2], [2, 3]];
      const b = [[3, 4], [4, 5]];
      expect(Array.from(new KeyedSeq(a).concat(b))).toEqual([...a, ...b]);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(new KeyedSeq(iterator).map(mapMockFn))).toEqual([[1, 2], [2, 3], [3, 4]]);
      expect(mapMockFn.mock.calls).toEqual(entriesArray);
    });

    it('can tap', function() {
      const tapFn = jest.fn();
      Array.from(new KeyedSeq(iterator).tap(tapFn));
      expect(tapFn.mock.calls).toEqual(entriesArray);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(new KeyedSeq(iterator).filter(filterMockFn))).toEqual([[2, 2], [3, 3]]);
      expect(filterMockFn.mock.calls).toEqual(entriesArray);
    });

    it('can be converted to IndexedSeq (noop)', function() {
      const indexed = new KeyedSeq([[2, 1], [3, 2], [4, 3]]).toIndexedSeq();
      expect(Array.from(indexed)).toEqual([1, 2, 3]);
      expect(indexed).toBeInstanceOf(IndexedSeq);
    });

    it('can be converted to KeyedSeq (noop)', function() {
      const keyed = new KeyedSeq([1, 2, 3]);
      expect(keyed.toKeyedSeq()).toBe(keyed);
    });

    it('can be converted to SetSeq', function() {
      const set = new KeyedSeq([[2, 1], [3, 2], [4, 3]]).toSetSeq();
      expect(Array.from(set)).toEqual([1, 2, 3]);
      expect(set).toBeInstanceOf(SetSeq);
    });

    it('has keys iterator', function() {
      expect(Array.from(new KeyedSeq(iterator).keys())).toEqual(array);
    });

    it('has values iterator', function() {
      expect(Array.from(new KeyedSeq(iterator).values())).toEqual(array);
    });

    it('has entries iterator', function() {
      expect(Array.from(new KeyedSeq(iterator).entries())).toEqual(entriesArray);
    });
  });
});
