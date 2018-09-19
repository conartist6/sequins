import { IndexedSeq, KeyedSeq, SetSeq } from '../../index-test';
import { Namespace as Collection } from '../../collection';
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
      flatten = makeFlatten(Collection, 'Sequence', 'Indexed');
    });

    beforeEach(function() {
      const Seq = initial => new IndexedSeq([initial]);
      aa = Seq(1);
      bb = Seq(2);
      cc = Seq(3);
      a = Seq(aa);
      b = Seq(bb);
      c = Seq(cc);
      seq = new IndexedSeq([a, b, c]);
    });

    it('does a shallow flatten when passed true', function() {
      expect(Array.from(flatten(true, seq))).toEqual([aa, bb, cc]);
    });

    it('does a deep flatten when passed 0', function() {
      expect(Array.from(flatten(0, seq))).toEqual([1, 2, 3]);
    });

    it('does a deep flatten when passed no params', function() {
      expect(Array.from(flatten(seq))).toEqual([1, 2, 3]);
    });

    it('does a deep flatten when when passed false', function() {
      expect(Array.from(flatten(false, seq))).toEqual([1, 2, 3]);
    });

    it('flattens n levels when passed depth n', function() {
      expect(Array.from(flatten(1, seq))).toEqual([aa, bb, cc]);
    });
  });
});
