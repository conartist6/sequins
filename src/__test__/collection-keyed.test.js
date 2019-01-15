import makeTestMethod from './helpers/make-test-method';
import { KeyedSequence, Map } from '..';
import testData from './data';

function makeTests(KeyedConstructor, collectionType, collectionSubtype) {
  describe(KeyedConstructor.name, function() {
    const { object, objectEntries, keys, values, entries, array } = testData.Keyed;
    const staticKeyed = new KeyedConstructor(array);
    let calls = makeCalls(testData.Keyed.calls);
    let keyed: KeyedConstructor<number, number>;

    function makeCalls(calls: any) {
      return collectionType === 'Concrete'
        ? calls.map((call: any) => [...call, staticKeyed])
        : calls;
    }

    const testMethod = makeTestMethod(KeyedConstructor);

    it('can be constructed from an object', function() {
      const keyed = new KeyedConstructor(object);
      expect(Array.from(keyed)).toEqual(objectEntries);
    });

    describe('instance methods', function() {
      beforeEach(function() {
        keyed = new KeyedConstructor(entries);
      });

      testMethod('map', mt => {
        mt.callback((val: number) => val + 1, calls)
          .expectCollectionYields([[9, 2], [8, 3], [7, 4]])
          .run(mapFn => keyed.map(mapFn));
      });

      testMethod('mapKeys', mt => {
        mt.callback((key: number) => key - 1)
          .expectCalls(makeCalls(entries))
          .expectCollectionYields([[8, 1], [7, 2], [6, 3]])
          .run(mapFn => keyed.mapKeys(mapFn));
      });

      testMethod('mapEntries', mt => {
        mt.callback(([key, val]: [number, number]): [number, number] => [--val, ++key])
          .expectCalls(makeCalls([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]]))
          .expectCollectionYields([[0, 10], [1, 9], [2, 8]])
          .run(mapFn => keyed.mapEntries(mapFn));
      });

      testMethod('flip', mt => {
        mt.expectCollectionYields([[1, 9], [2, 8], [3, 7]]) //
          .run(() => keyed.flip());
      });

      testMethod('flatMap (KeyedSeqs)', mt => {
        mt.callback((val: number) => new KeyedSequence([[val + 1, val + 2]]))
          .expectCalls(calls)
          .expectCollectionYields([[2, 3], [3, 4], [4, 5]])
          .run(mapFn => keyed.flatMap(mapFn));
      });

      testMethod('flatMap (Maps)', mt => {
        mt.callback((val: number) => new Map([[val + 1, val + 2]]))
          .expectCalls(calls)
          .expectCollectionYields([[2, 3], [3, 4], [4, 5]])
          .run(mapFn => keyed.flatMap(mapFn));
      });

      testMethod('reduce', mt => {
        mt.callback((acc: number, val: number, key: number) => acc + val)
          .expectCalls(makeCalls([[1, 2, 8], [3, 3, 7]]))
          .expectReturns(6)
          .run(reducerFn => keyed.reduce(reducerFn));
      });
    });
  });
}

makeTests(KeyedSequence, 'Sequence', 'Keyed');
makeTests(Map, 'Concrete', 'Keyed');
