import { Namespace as Collection } from '../collection';
import { KeyedSeq, Map } from '../index';
import makeTestMethod from './helpers/make-test-method';
import testData from './data';

function makeTests(collectionType) {
  const KeyedConstructor = Collection[collectionType].Keyed;

  describe(KeyedConstructor.name, function() {
    const { object, keys, values, entries, array } = testData.Keyed;
    const staticKeyed = new KeyedConstructor(array);
    let calls = makeCalls(testData.Keyed.calls);
    let keyed;

    function makeCalls(calls) {
      return collectionType === 'Concrete' ? calls.map(call => [...call, staticKeyed]) : calls;
    }

    const testMethod = makeTestMethod(KeyedConstructor);

    it('can be constructed from an object', function() {
      keyed = new KeyedConstructor(object);
      expect(Array.from(keyed)).toEqual(array.map(([key, val]) => [key.toString(), val]).reverse());
    });

    describe('instance methods', function() {
      beforeEach(function() {
        keyed = new KeyedConstructor(entries);
      });

      testMethod('map', t => {
        t.callback(val => val + 1, calls);
        t.run(mapFn => keyed.map(mapFn));
        t.expectCollectionYields([[9, 2], [8, 3], [7, 4]]);
      });

      testMethod('mapKeys', t => {
        t.callback(key => key - 1);
        t.expectCalls(makeCalls(entries));
        t.run(mapFn => keyed.mapKeys(mapFn));
        t.expectCollectionYields([[8, 1], [7, 2], [6, 3]]);
      });

      testMethod('mapEntries', t => {
        t.callback(([key, val]) => [val, key]);
        t.expectCalls(makeCalls([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]]));
        t.run(mapFn => keyed.mapEntries(mapFn));
        t.expectCollectionYields([[1, 9], [2, 8], [3, 7]]);
      });

      testMethod('flatMap (KeyedSeqs)', t => {
        t.callback(val => new KeyedSeq([[val + 1, val + 2]]));
        t.expectCalls(calls);
        t.run(mapFn => keyed.flatMap(mapFn));
        t.expectCollectionYields([[2, 3], [3, 4], [4, 5]]);
      });

      testMethod('flatMap (Maps)', t => {
        t.callback(val => new Map([[val + 1, val + 2]]));
        t.expectCalls(calls);
        t.run(mapFn => keyed.flatMap(mapFn));
        t.expectCollectionYields([[2, 3], [3, 4], [4, 5]]);
      });

      testMethod('reduce', t => {
        t.callback((acc, val, key) => acc + val);
        t.expectCalls(makeCalls([[1, 2, 8], [3, 3, 7]]));
        t.run(reducerFn => keyed.reduce(reducerFn));
        t.expectReturns(6);
      });
    });
  });
}

makeTests('Sequence');
makeTests('Concrete');
