import { IndexedSequence, KeyedSequence, SetSequence, Seq } from '../..';
import makeTestMethod from '../../__test__/helpers/make-test-method';

describe('flatten', function() {
  describe('Indexed', function() {
    let a: IndexedSequence<IndexedSequence<number>>;
    let aa: IndexedSequence<number>;
    let b: IndexedSequence<IndexedSequence<number>>;
    let bb: IndexedSequence<number>;
    let c: IndexedSequence<IndexedSequence<number>>;
    let cc: IndexedSequence<number>;
    let seq: IndexedSequence<IndexedSequence<IndexedSequence<number>>>;

    describe('base cases', function() {
      it('does nothing when flattening and empty sequence', function() {
        expect(new KeyedSequence().map(x => x).flatten()).toEqual(new KeyedSequence());
      });
    });

    describe('primitives', function() {
      it("doesn't flatten into native objects", function() {
        const native = {
          foo: [
            {
              someKey: 'foo',
            },
          ],
        };
        expect(
          Seq([native])
            .flatten()
            .toArray(),
        ).toEqual([native]);
      });
    });

    describe('depth', function() {
      const testMethod = makeTestMethod(IndexedSequence);

      beforeEach(function() {
        aa = Seq([1]);
        bb = Seq([2]);
        cc = Seq([3]);
        a = Seq([aa]);
        b = Seq([bb]);
        c = Seq([cc]);
        seq = new IndexedSequence([a, b, c]);
      });

      testMethod('flatten: does a shallow flatten when passed true', mt => {
        mt.expectCollectionYields([aa, bb, cc]) //
          .run(() => seq.flatten(true));
      });

      testMethod('flatten: does a deep flatten when passed 0', mt => {
        mt.expectCollectionYields([1, 2, 3]) //
          .run(() => seq.flatten(0));
      });

      testMethod('flatten: does a deep flatten when passed no params', mt => {
        mt.expectCollectionYields([1, 2, 3]) //
          .run(() => seq.flatten());
      });

      testMethod('flatten: does a deep flatten when when passed false', mt => {
        mt.expectCollectionYields([1, 2, 3]) //
          .run(() => seq.flatten(false));
      });

      testMethod('flatten: flattens n levels when passed depth n', mt => {
        mt.expectCollectionYields([aa, bb, cc]) //
          .run(() => seq.flatten(1));
      });
    });
  });
});
