import makeTestMethod from './helpers/make-test-method';
import { SetSequence, Set } from '..';
import testData, { makeCalls } from './data';

function makeTests(SetConstructor, collectionType, collectionSubtype) {
  describe(SetConstructor.name, function() {
    const { keys, values, entries, calls: rawCalls, array } = testData.Duplicated;
    const callbackSet = collectionType == 'Concrete' ? new SetConstructor(array) : null;
    const calls = makeCalls(rawCalls, callbackSet);
    let set: SetConstructor<number>;

    const testMethod = makeTestMethod(SetConstructor);

    describe('instance methods', function() {
      beforeEach(function() {
        set = new SetConstructor(array);
      });

      testMethod('map', mt => {
        mt.callback((val: number) => val + 1, calls)
          .expectCollectionYields([2, 3, 4])
          .run(mapFn => set.map(mapFn));
      });

      testMethod('flatMap (SetSeqs)', mt => {
        mt.callback((val: number) => new SetSequence([val + 1, val + 1.5]))
          .expectCalls(calls)
          .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5])
          .run(mapFn => set.flatMap(mapFn));
      });

      testMethod('flatMap (Sets)', mt => {
        mt.callback((val: number) => new Set([val + 1, val + 1.5]))
          .expectCalls(calls)
          .expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5])
          .run(mapFn => set.flatMap(mapFn));
      });

      testMethod('reduce', mt => {
        mt.callback((acc: number, val: number, key: number) => acc + val)
          .expectCalls(makeCalls([[1, 2, 2], [3, 3, 3]], callbackSet))
          .expectReturns(6)
          .run(reducerFn => set.reduce(reducerFn));
      });
    });
  });
}

makeTests(SetSequence, 'Sequence', 'Duplicated');
makeTests(Set, 'Concrete', 'Duplicated');
