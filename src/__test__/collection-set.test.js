import { Namespace as Collection } from '../collection';
import { SetSeq, Set } from '../index';
import makeTestMethod from './helpers/make-test-method';
import testData, { makeCalls } from './data';

function makeTests(collectionType) {
  const SetConstructor = Collection[collectionType].Set;

  describe(SetConstructor.name, function() {
    const { keys, values, entries, calls: rawCalls, array } = testData.Set;
    const callbackSet = collectionType == 'Concrete' ? new SetConstructor(array) : null;
    const calls = makeCalls(rawCalls, callbackSet);
    let set;

    const testMethod = makeTestMethod(SetConstructor);

    describe('instance methods', function() {
      beforeEach(function() {
        set = new SetConstructor(array);
      });

      testMethod('tap', t => {
        t.callback(() => null, calls);
        t.run(tapFn => set.tap(tapFn));
        t.expectCollectionYields(array);
      });

      testMethod('map', t => {
        t.callback(val => val + 1, calls);
        t.run(mapFn => set.map(mapFn));
        t.expectCollectionYields([2, 3, 4]);
      });

      testMethod('flatMap (SetSeqs)', t => {
        t.callback(val => new SetSeq([val + 1, val + 1.5]));
        t.expectCalls(calls);
        t.run(mapFn => set.flatMap(mapFn));
        t.expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);
      });

      testMethod('flatMap (Sets)', t => {
        t.callback(val => new Set([val + 1, val + 1.5]));
        t.expectCalls(calls);
        t.run(mapFn => set.flatMap(mapFn));
        t.expectCollectionYields([2, 2.5, 3, 3.5, 4, 4.5]);
      });

      testMethod('reduce', t => {
        t.callback((acc, val, key) => acc + val);
        t.expectCalls(makeCalls([[1, 2, 2], [3, 3, 3]], callbackSet));
        t.run(reducerFn => set.reduce(reducerFn));
        t.expectReturns(6);
      });
    });
  });
}

makeTests('Sequence');
makeTests('Concrete');
