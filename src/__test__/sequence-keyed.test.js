import { iter } from 'iter-tools';
import KeyedSeq from '../sequence-keyed';

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
