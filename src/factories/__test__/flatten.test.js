import { IndexedSeq, KeyedSeq, SetSeq } from "../../index";
import { Namespace as Collection } from "../../collection";

describe("flatten", function() {
  describe("Indexed", function() {
    let a;
    let aa;
    let b;
    let bb;
    let c;
    let cc;
    let seq;
    let iterator;

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

    it("does a shallow flatten when passed true", function() {
      expect(Array.from(seq.flatten(true))).toEqual([aa, bb, cc]);
    });

    it("does a deep flatten when passed 0", function() {
      expect(Array.from(seq.flatten(0))).toEqual([1, 2, 3]);
    });

    it("does a deep flatten when passed no params", function() {
      expect(Array.from(seq.flatten())).toEqual([1, 2, 3]);
    });

    it("does a deep flatten when when passed false", function() {
      expect(Array.from(seq.flatten(false))).toEqual([1, 2, 3]);
    });

    it("flattens n levels when passed depth n", function() {
      expect(Array.from(seq.flatten(1))).toEqual([aa, bb, cc]);
    });
  });
});
