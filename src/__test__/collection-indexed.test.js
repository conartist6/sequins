import makeTestMethod from './helpers/make-test-method';
import { IndexedSequence, List } from '..';
import testData from './data';

function makeTests(IndexedConstructor, collectionType, collectionSubtype) {
  describe(IndexedConstructor.name, function() {
    const { keys, values, entries, array } = testData.Indexed;
    const staticIndexed = new IndexedConstructor(array);
    const calls = makeCalls(testData.Indexed.calls);
    let indexed: IndexedConstructor<number>;

    function makeCalls(calls: any): any {
      return collectionType === 'Concrete'
        ? calls.map((call: any) => [...call, staticIndexed])
        : calls;
    }

    const testMethod = makeTestMethod(IndexedConstructor);

    describe('instance methods', function() {
      beforeEach(function() {
        indexed = new IndexedConstructor(array);
      });

      testMethod('zip', mt => {
        mt.expectCollectionYields([[1, 2], [2, 3], [3, 4]]) //
          .run(() => indexed.zip([2, 3, 4, 5]));
      });

      testMethod('zipAll', mt => {
        mt.expectCollectionYields([[1, 2], [2, 3], [3, 4], [undefined, 5]]) //
          .run(() => indexed.zipAll([2, 3, 4, 5]));
      });

      testMethod('zipWith', mt => {
        mt.callback((a: number, b: number) => a + b)
          .expectCalls([[1, 2], [2, 3], [3, 4]])
          .expectCollectionYields([3, 5, 7])
          .run(zipperFn => indexed.zipWith(zipperFn, [2, 3, 4]));
      });

      testMethod('interpose', mt => {
        mt.expectCollectionYields([1, null, 2, null, 3]) //
          .run(() => indexed.interpose(null));
      });

      testMethod('map', mt => {
        mt.callback((val: number) => val + 1, calls)
          .expectCollectionYields([2, 3, 4])
          .run(mapFn => indexed.map(mapFn));
      });

      testMethod('flatMap (IndexedSequences)', mt => {
        mt.callback((val: number) => new IndexedSequence([val + 1, val + 1.5]))
          .expectCalls(calls)
          .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5])
          .run(mapFn => indexed.flatMap(mapFn));
      });

      testMethod('flatMap (Lists)', mt => {
        mt.callback((val: number) => new List([val + 1, val + 1.5]))
          .expectCalls(calls)
          .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5])
          .run(mapFn => indexed.flatMap(mapFn));
      });

      testMethod('reduce', mt => {
        mt.callback((acc: number, val: number) => acc + val)
          .expectCalls(makeCalls([[1, 2, 1], [3, 3, 2]]))
          .expectReturns(6)
          .run(reducerFn => indexed.reduce(reducerFn));
      });
    });
  });
}

makeTests(IndexedSequence, 'Sequence', 'Indexed');
makeTests(List, 'Concrete', 'Indexed');
