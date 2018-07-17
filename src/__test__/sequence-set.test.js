import { iter } from 'iter-tools';
import SetSeq from '../sequence-set';

describe('Seq.Set', function() {
  describe('basic functionality', function() {
    let array;
    let iterator;

    beforeEach(function() {
      array = [1, 2, 3];
      iterator = iter(array);
    });

    it('has the identity property', function() {
      expect(Array.from(new SetSeq(iterator))).toEqual(array);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      expect(Array.from(new SetSeq(iterator).map(mapFn))).toEqual(array.map(mapFn));
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      expect(Array.from(new SetSeq(iterator).filter(filterFn))).toEqual(array.filter(filterFn));
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
