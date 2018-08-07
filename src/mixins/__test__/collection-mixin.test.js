import makeTestMethod from '../../test-helpers/make-test-method';
import IndexedSequence from '../../subtypes/sequence/indexed';
import KeyedSequence from '../../subtypes/sequence/keyed';
import SetSequence from '../../subtypes/sequence/set';
import SequinsList from '../../subtypes/concrete/list';
import SequinsMap from '../../subtypes/concrete/map';
import SequinsSet from '../../subtypes/concrete/set';
import makeFlatten from '../../factories/flatten';
import testDataByType from '../../__test__/data';

const ConcreteTypes = {
  Indexed: SequinsList,
  Keyed: SequinsMap,
  Set: SequinsSet,
};

function makeTests(CollectionConstructor, type, description) {
  const testData = testDataByType[type];

  describe(description, function() {
    let collection;

    const testMethod = makeTestMethod(CollectionConstructor);

    beforeEach(() => {
      collection = new CollectionConstructor(testData.array);
    });

    it('can flatten', function() {
      // The flatten implementation has its own tests
      const flatten = makeFlatten(collection.__getStatics(), type);
      const result = collection.flatten();
      expect(result).toBeInstanceOf(CollectionConstructor);
      expect(collection.flatten(true)).toBeIterable(expect.yieldsEqual(flatten(true, collection)));
    });

    const concatTestData = {
      Indexed: [4, 5, 6],
      Keyed: [[6, 4], [5, 5], [4, 6]],
      Set: [4, 5, 6],
    };

    testMethod('concat')
      .run(() => collection.concat(concatTestData[type]))
      .expectCollectionYields([...testData.array, ...concatTestData[type]]);

    // testMethod('mapEntries')
    //   .callback(([key, val]) => [val, key])
    //   .expectCalls([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]])
    //   .run(mapFn => keyed.mapEntries(mapFn))
    //   .expectCollectionYields([[1, 9], [2, 8], [3, 7]]);

    it('can toJS', function() {
      // The flatten implementation has its own tests
      expect(collection.toJS()).toEqual(testData.js);
    });

    // testMethod('toIndexedSeq');
    // testMethod('toKeyedSeq');
    // testMethod('toSetSeq');

    // testMethod('keySeq');
    // testMethod('valueSeq');
    // testMethod('entrySeq');

    // testMethod('toArray');
    // testMethod('toObject');
    // testMethod('toMap');
    // testMethod('toSet');
  });
}
debugger;
makeTests(IndexedSequence, 'Indexed', 'IndexedSequence');
makeTests(KeyedSequence, 'Keyed', 'KeyedSequence');
makeTests(SetSequence, 'Set', 'SetSequence');
makeTests(SequinsList, 'Indexed', 'SequinsList');
makeTests(SequinsMap, 'Keyed', 'SequinsMap');
makeTests(SequinsSet, 'Set', 'SequinsSet');
