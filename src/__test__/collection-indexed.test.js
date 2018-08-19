import makeTestMethod from './helpers/make-test-method';
import IndexedSequence from '../subtypes/sequence/indexed';
import SequinsList from '../subtypes/concrete/list';
import testData from './data';

function makeTests(IndexedConstructor, description) {
  describe(description, function() {
    let indexed;

    const { keys, values, entries, calls, array } = testData.Indexed;

    const testMethod = makeTestMethod(IndexedConstructor);

    beforeEach(function() {
      indexed = new IndexedConstructor(array);
    });

    testMethod('tap')
      .callback(() => null, calls)
      .run(tapFn => indexed.tap(tapFn))
      .expectCollectionYields(array);

    testMethod('map')
      .callback(val => val + 1, calls)
      .run(mapFn => indexed.map(mapFn))
      .expectCollectionYields([2, 3, 4]);

    testMethod('flatMap (IndexedSequences)')
      .callback(val => new IndexedSequence([val + 1, val + 1.5]))
      .expectCalls(calls)
      .run(mapFn => indexed.flatMap(mapFn))
      .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);

    testMethod('flatMap (Arrays)')
      .callback(val => [val + 1, val + 1.5])
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
      .expectCalls([[1, 2, 1], [3, 3, 2]])
      .run(reducerFn => indexed.reduce(reducerFn))
      .expectReturns(6);

    testMethod('forEach')
      .callback(() => true, calls)
      .run(eachFn => indexed.forEach(eachFn))
      .expectReturns(3);
  });
}

makeTests(IndexedSequence, 'IndexedSequence');
makeTests(SequinsList, 'List');
