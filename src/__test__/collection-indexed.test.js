import { Namespace as Collection } from '../collection';
import { IndexedSeq, List } from '../index-test';
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

    beforeEach(function() {
      indexed = new IndexedConstructor(array);
    });

    testMethod('zip')
      .run(() => indexed.zip([2, 3, 4, 5]))
      .expectCollectionYields([[1, 2], [2, 3], [3, 4]]);

    testMethod('zipAll')
      .run(() => indexed.zipAll([2, 3, 4, 5]))
      .expectCollectionYields([[1, 2], [2, 3], [3, 4], [undefined, 5]]);

    testMethod('zipWith')
      .callback((a, b) => a + b)
      .expectCalls([[1, 2], [2, 3], [3, 4]])
      .run(zipperFn => indexed.zipWith(zipperFn, [2, 3, 4]))
      .expectCollectionYields([3, 5, 7]);

    testMethod('tap')
      .callback(() => null, calls)
      .run(tapFn => indexed.tap(tapFn))
      .expectCollectionYields(array);

    testMethod('map')
      .callback(val => val + 1, calls)
      .run(mapFn => indexed.map(mapFn))
      .expectCollectionYields([2, 3, 4]);

    testMethod('flatMap (IndexedSequences)')
      .callback(val => new IndexedSeq([val + 1, val + 1.5]))
      .expectCalls(calls)
      .run(mapFn => indexed.flatMap(mapFn))
      .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);

    testMethod('flatMap (Lists)')
      .callback(val => new List([val + 1, val + 1.5]))
      .expectCalls(calls)
      .run(mapFn => indexed.flatMap(mapFn))
      .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);

    testMethod('filter')
      .callback(val => val > 1, calls)
      .run(filterFn => indexed.filter(filterFn))
      .expectCollectionYields([2, 3]);

    testMethod('filterNot')
      .callback(val => val > 1, calls)
      .run(filterFn => indexed.filterNot(filterFn))
      .expectCollectionYields([1]);

    testMethod('reduce')
      .callback((acc, val) => acc + val)
      .expectCalls(makeCalls([[1, 2, 1], [3, 3, 2]]))
      .run(reducerFn => indexed.reduce(reducerFn))
      .expectReturns(6);

    testMethod('forEach')
      .callback(() => true, calls)
      .run(eachFn => indexed.forEach(eachFn))
      .expectReturns(3);
  });
}

makeTests('Sequence');
makeTests('Concrete');
