import { iter } from 'iter-tools';
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
