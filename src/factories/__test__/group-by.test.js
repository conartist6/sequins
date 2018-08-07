import IndexedSeq from '../../subtypes/sequence/indexed';
import KeyedSeq from '../../subtypes/sequence/keyed';
import SetSeq from '../../subtypes/sequence/set';
import Sequence from '../../sequence';
import makeGroupBy from '../group-by';

describe('groupBy', function() {
  let groupBy;

  describe('Indexed', function() {
    beforeAll(function() {
      groupBy = makeGroupBy(Sequence, 'Indexed');
    });

    it('works', function() {
      const indexed = new IndexedSeq([1, 1, 2, 2]);
      const grouped = groupBy(indexed, v => v);

      expect(grouped).toBeInstanceOf(Map);
      expect(grouped.get(1)).toBeInstanceOf(IndexedSeq);
      expect(grouped.get(2)).toBeInstanceOf(IndexedSeq);

      expect(new Map(new KeyedSeq(grouped))).toEqual(new Map([[1, [1, 1]], [2, [2, 2]]]));
    });
  });

  describe('Keyed', function() {
    beforeAll(function() {
      groupBy = makeGroupBy(Sequence, 'Keyed');
    });

    it('works', function() {
      const indexed = new KeyedSeq([[1, 1], [1, 1], [2, 2], [2, 2]]);
      const grouped = groupBy(indexed, v => v);

      expect(grouped).toBeInstanceOf(Map);
      expect(grouped.get(1)).toBeInstanceOf(KeyedSeq);
      expect(grouped.get(2)).toBeInstanceOf(KeyedSeq);

      expect(new Map(new KeyedSeq(grouped))).toEqual(
        new Map([[1, new Map([[1, 1], [1, 1]])], [2, new Map([[2, 2], [2, 2]])]]),
      );
    });
  });

  describe('Set', function() {
    beforeAll(function() {
      groupBy = makeGroupBy(Sequence, 'Set');
    });

    it('works', function() {
      const indexed = new SetSeq([1, 1, 2, 2]);
      const grouped = groupBy(indexed, v => v);

      expect(grouped).toBeInstanceOf(Map);
      expect(grouped.get(1)).toBeInstanceOf(SetSeq);
      expect(grouped.get(2)).toBeInstanceOf(SetSeq);

      expect(new Map(new KeyedSeq(grouped))).toEqual(
        new Map([[1, new Set([1, 1])], [2, new Set([2, 2])]]),
      );
    });
  });
});
