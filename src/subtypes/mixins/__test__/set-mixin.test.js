import makeTestMethod from '../../../test-helpers/make-test-method';
import SetSequence from '../../sequence/set';
import SequinsSet from '../../concrete/set';

function makeTests(SetConstructor, description) {
  describe(description, function() {
    let array = [1, 2, 3];
    let entries = [[1, 1], [2, 2], [3, 3]];
    let calls = entries;
    let set;

    const testMethod = makeTestMethod(SetConstructor);

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

    testMethod('flatMap (SetSequences)')
      .callback(val => new SetSequence([val + 1, val + 1.5]))
      .expectCalls(calls)
      .run(mapFn => set.flatMap(mapFn))
      .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);

    testMethod('flatMap (Sets)')
      .callback(val => new SequinsSet([val + 1, val + 1.5]))
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
      .expectCalls([[1, 2, 2], [3, 3, 3]])
      .run(reducerFn => set.reduce(reducerFn))
      .expectReturns(6);

    testMethod('forEach')
      .callback(() => true, calls)
      .run(eachFn => set.forEach(eachFn))
      .expectReturns(3);
  });
}

makeTests(SetSequence, 'SetSequence');
makeTests(SequinsSet, 'Set');
