import { iter } from 'iter-tools';
import IndexedSeq from '../sequence-indexed';

describe('Seq.Indexed', function() {
  describe('basic functionality', function() {
    let array;
    let iterator;

    beforeEach(function() {
      array = [1, 2, 3];
      iterator = iter(array);
    });

    it('has the identity property', function() {
      expect(Array.from(new IndexedSeq(iterator))).toEqual(array);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(new IndexedSeq(iterator).map(mapMockFn))).toEqual(array.map(mapFn));
      expect(mapMockFn.mock.calls).toEqual([[1, 0], [2, 1], [3, 2]]);
    });

    it('can tap', function() {
      const tapFn = jest.fn();
      Array.from(new IndexedSeq(iterator).tap(tapFn));
      expect(tapFn.mock.calls).toEqual([[1, 0], [2, 1], [3, 2]]);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(new IndexedSeq(iterator).filter(filterMockFn))).toEqual(
        array.filter(filterFn),
      );
      expect(filterMockFn.mock.calls).toEqual([[1, 0], [2, 1], [3, 2]]);
    });

    it('has keys iterator', function() {
      expect(Array.from(new IndexedSeq(iterator).keys())).toEqual([0, 1, 2]);
    });

    it('has values iterator', function() {
      expect(Array.from(new IndexedSeq(iterator).values())).toEqual(array);
    });

    it('has entries iterator', function() {
      expect(Array.from(new IndexedSeq(iterator).entries())).toEqual([[0, 1], [1, 2], [2, 3]]);
    });
  });
});
