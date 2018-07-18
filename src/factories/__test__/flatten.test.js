import { iter } from 'iter-tools';
// Import order is always Sequence, Indexed, Keyed, Set to avoid circular dep breakdown
import IndexedSeq from '../../sequence-indexed';
import KeyedSeq from '../../sequence-keyed';
import SetSeq from '../../sequence-set';
import makeFlatten from '../flatten';

describe('flatten', function() {
  describe('Indexed', function() {
    let a;
    let aa;
    let b;
    let bb;
    let c;
    let cc;
    let seq;
    let iterator;
    let flatten;

    beforeAll(function() {
      flatten = makeFlatten('Indexed');
    });

    beforeEach(function() {
      const Seq = initial => new IndexedSeq([initial]);
      aa = Seq(1);
      bb = Seq(2);
      cc = Seq(3);
      a = Seq(aa);
      b = Seq(bb);
      c = Seq(cc);
      seq = Seq([a, b, c]);
      iterator = iter(seq);
    });

    it('does a shallow flatten if passed true', function() {
      expect(Array.from(flatten(true, iterator))).toEqual([a, b, c]);
    });

    it('does a shallow flatten if passed 0', function() {
      expect(Array.from(flatten(0, iterator))).toEqual([a, b, c]);
    });

    it('flattens n levels when passed depth n', function() {
      expect(Array.from(flatten(1, iterator))).toEqual([aa, bb, cc]);
    });

    it('flattens deeply when passed false', function() {
      expect(Array.from(flatten(false, iterator))).toEqual([1, 2, 3]);
    });
  });
});
