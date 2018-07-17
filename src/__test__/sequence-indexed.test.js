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
      expect(Array.from(new IndexedSeq(iterator).map(mapFn))).toEqual(array.map(mapFn));
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      expect(Array.from(new IndexedSeq(iterator).filter(filterFn))).toEqual(array.filter(filterFn));
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
