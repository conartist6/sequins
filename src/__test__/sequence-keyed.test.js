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
      expect(Array.from(new KeyedSeq(iterator).map(mapFn))).toEqual([[1, 2], [2, 3], [3, 4]]);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      expect(Array.from(new KeyedSeq(iterator).filter(filterFn))).toEqual([[2, 2], [3, 3]]);
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
