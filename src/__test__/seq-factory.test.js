import { Seq, KeyedSeq, IndexedSeq, SetSeq } from '../index';

describe('Seq', function() {
  describe('construction', function() {
    it('can be constructed from null', function() {
      expect(Array.from(Seq(null))).toEqual([]);
    });

    it('can be constructed from an iterable', function() {
      expect(Array.from(Seq([1, 2, 3]))).toEqual([1, 2, 3]);
    });

    it('can be constructed from an Sequence', function() {
      const entries = [[1, 1], [2, 2], [3, 3]];
      const indexed = new IndexedSeq(entries);
      const keyed = new KeyedSeq(entries);
      const set = new SetSeq(entries);
      //expect(Array.from(Seq(indexed))).toEqual(Array.from(indexed));
      expect(Array.from(Seq(keyed))).toEqual(Array.from(indexed));
      expect(Array.from(Seq(set))).toEqual(Array.from(indexed));
    });
  });

  describe('chaining', function() {
    it('chains functions in sequential order', function() {
      expect(
        Array.from(
          Seq([1, null, 3])
            .filter(Boolean)
            .map(x => ++x),
        ),
      ).toEqual([2, 4]);
    });
  });
});
