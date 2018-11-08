import { Namespace as Collection } from '../collection';
import { IndexedSeq, List } from '../index';
import makeTestMethod from './helpers/make-test-method';
import testData from './data';

function makeTests(collectionType) {
  const IndexedConstructor = Collection[collectionType].Indexed;

  describe(IndexedConstructor.name, function() {
    const { keys, values, entries, array } = testData.Indexed;
    const staticIndexed = new IndexedConstructor(array);
    const calls = makeCalls(testData.Indexed.calls);
    let indexed;

    function makeCalls(calls) {
      return collectionType === 'Concrete' ? calls.map(call => [...call, staticIndexed]) : calls;
    }

    const testMethod = makeTestMethod(IndexedConstructor);

    describe('instance methods', function() {
      beforeEach(function() {
        indexed = new IndexedConstructor(array);
      });

      testMethod('zip', t => {
        t.run(() => indexed.zip([2, 3, 4, 5]));
        t.expectCollectionYields([[1, 2], [2, 3], [3, 4]]);
      });

      testMethod('zipAll', t => {
        t.run(() => indexed.zipAll([2, 3, 4, 5]));
        t.expectCollectionYields([[1, 2], [2, 3], [3, 4], [undefined, 5]]);
      });

      testMethod('zipWith', t => {
        t.callback((a, b) => a + b);
        t.expectCalls([[1, 2], [2, 3], [3, 4]]);
        t.run(zipperFn => indexed.zipWith(zipperFn, [2, 3, 4]));
        t.expectCollectionYields([3, 5, 7]);
      });

      testMethod('map', t => {
        t.callback(val => val + 1, calls);
        t.run(mapFn => indexed.map(mapFn));
        t.expectCollectionYields([2, 3, 4]);
      });

      testMethod('flatMap (IndexedSequences)', t => {
        t.callback(val => new IndexedSeq([val + 1, val + 1.5]));
        t.expectCalls(calls);
        t.run(mapFn => indexed.flatMap(mapFn));
        t.expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);
      });

      testMethod('flatMap (Lists)', t => {
        t.callback(val => new List([val + 1, val + 1.5]));
        t.expectCalls(calls);
        t.run(mapFn => indexed.flatMap(mapFn));
        t.expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);
      });

      testMethod('reduce', t => {
        t.callback((acc, val) => acc + val);
        t.expectCalls(makeCalls([[1, 2, 1], [3, 3, 2]]));
        t.run(reducerFn => indexed.reduce(reducerFn));
        t.expectReturns(6);
      });
    });
  });
}

makeTests('Sequence');
makeTests('Concrete');
