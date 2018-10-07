import { Namespace as Collection } from '../collection';
import { SetSeq, Set } from '../index-test';
import makeTestMethod from './helpers/make-test-method';
import testData from './data';

function makeTests(collectionType) {
  const SetConstructor = Collection[collectionType].Set;

  describe(SetConstructor.name, function() {
    const { keys, values, entries, array } = testData.Set;
    const staticSet = new SetConstructor(array);
    const calls = makeCalls(testData.Set.calls);
    let set;

    function makeCalls(calls) {
      return collectionType === 'Concrete' ? calls.map(call => [...call, staticSet]) : calls;
    }

    const testMethod = makeTestMethod(SetConstructor);

    describe('instance methods', function() {
      beforeEach(function() {
        set = new SetConstructor(array);
      });

      testMethod('tap')
        .callback(() => null, calls)
        .run(tapFn => set.tap(tapFn))
        .expectCollectionYields(array);

      testMethod('map')
        .callback(val => val + 1, calls)
        .run(mapFn => set.map(mapFn))
        .expectCollectionYields([2, 3, 4]);

      testMethod('flatMap (SetSeqs)')
        .callback(val => new SetSeq([val + 1, val + 1.5]))
        .expectCalls(calls)
        .run(mapFn => set.flatMap(mapFn))
        .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);

      testMethod('flatMap (Sets)')
        .callback(val => new Set([val + 1, val + 1.5]))
        .expectCalls(calls)
        .run(mapFn => set.flatMap(mapFn))
        .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);

      testMethod('filter')
        .callback(val => val > 1, calls)
        .run(filterFn => set.filter(filterFn))
        .expectCollectionYields([2, 3]);

      testMethod('filterNot')
        .callback(val => val > 1, calls)
        .run(filterFn => set.filterNot(filterFn))
        .expectCollectionYields([1]);

      testMethod('reduce')
        .callback((acc, val, key) => acc + val)
        .expectCalls(makeCalls([[1, 2, 2], [3, 3, 3]]))
        .run(reducerFn => set.reduce(reducerFn))
        .expectReturns(6);

      testMethod('forEach')
        .callback(() => true, calls)
        .run(eachFn => set.forEach(eachFn))
        .expectReturns(3);
    });
  });
}

makeTests('Sequence');
makeTests('Concrete');
