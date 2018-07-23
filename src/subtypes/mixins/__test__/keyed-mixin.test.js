import makeTestMethod from '../../../test-helpers/make-test-method';
import KeyedSequence from '../../sequence/keyed';
import SequinsMap from '../../concrete/map';

function makeTests(KeyedConstructor, description) {
  describe(description, function() {
    let values = Object.freeze([1, 2, 3]);
    let keys = Object.freeze([9, 8, 7]);
    let entries = Object.freeze([[9, 1], [8, 2], [7, 3]]);
    let calls = Object.freeze([[1, 9], [2, 8], [3, 7]]);

    let keyed;

    const testMethod = makeTestMethod(KeyedConstructor);

    beforeEach(function() {
      keyed = new KeyedConstructor(entries);
    });

    testMethod('tap')
      .callback(() => null, calls)
      .run(tapFn => keyed.tap(tapFn))
      .expectCollectionYields(entries);

    testMethod('map')
      .callback(val => val + 1, calls)
      .run(mapFn => keyed.map(mapFn))
      .expectCollectionYields([[9, 2], [8, 3], [7, 4]]);

    testMethod('mapKeys')
      .callback(key => key - 1, entries)
      .run(mapFn => keyed.mapKeys(mapFn))
      .expectCollectionYields([[8, 1], [7, 2], [6, 3]]);

    testMethod('mapEntries')
      .callback(([key, val]) => [val, key])
      .expectCalls([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]])
      .run(mapFn => keyed.mapEntries(mapFn))
      .expectCollectionYields([[1, 9], [2, 8], [3, 7]]);

    testMethod('flatMap (KeyedSequences)')
      .callback(val => new KeyedSequence([[val + 1, val + 2]]))
      .expectCalls(calls)
      .run(mapFn => keyed.flatMap(mapFn))
      .expectCollectionYields([[2, 3], [3, 4], [4, 5]]);

    testMethod('flatMap (Maps)')
      .callback(val => new Map([[val + 1, val + 2]]))
      .expectCalls(calls)
      .run(mapFn => keyed.flatMap(mapFn))
      .expectCollectionYields([[2, 3], [3, 4], [4, 5]]);

    testMethod('filter')
      .callback(val => val > 1, calls)
      .run(filterFn => keyed.filter(filterFn))
      .expectCollectionYields(entries.slice(1));

    testMethod('filterNot')
      .callback(val => val > 1, calls)
      .run(filterFn => keyed.filterNot(filterFn))
      .expectCollectionYields(entries.slice(0, 1));

    testMethod('reduce')
      .callback((acc, val, key) => acc + val)
      .expectCalls([[1, 2, 8], [3, 3, 7]])
      .run(reducerFn => keyed.reduce(reducerFn))
      .expectReturns(6);

    testMethod('forEach')
      .callback(() => true, calls)
      .run(eachFn => keyed.forEach(eachFn))
      .expectReturns(3);
  });
}

makeTests(KeyedSequence, 'KeyedSequence');
makeTests(SequinsMap, 'Map');
