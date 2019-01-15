import makeTestMethod from '../../__test__/helpers/make-test-method';
import { IndexedSequence, KeyedSequence, SetSequence, List, Map, Set } from '../..';
import { freezeTestData } from '../../__test__/data';

const dataByType: {
  Indexed: {
    array: Array<number>,
    sortedArray: Array<number>,
    objectValue: (value: number) => { value: number },
  },
  Keyed: {
    array: Array<[number, number]>,
    sortedArray: Array<[number, number]>,
    objectValue: (entry: [number, number]) => [number, { value: number }],
  },
  Duplicated: {
    array: Array<number>,
    sortedArray: Array<number>,
    objectValue: (value: number) => { value: number },
  },
} = {
  Indexed: {
    array: [3, 2, 4, 1],
    sortedArray: [1, 2, 3, 4],
    objectValue: value => ({ value }),
  },
  Keyed: {
    array: [[3, 3], [2, 2], [4, 4], [1, 1]],
    sortedArray: [[1, 1], [2, 2], [3, 3], [4, 4]],
    objectValue: ([key, value]) => [key, { value }],
  },
  Duplicated: {
    array: [3, 2, 4, 1],
    sortedArray: [1, 2, 3, 4],
    objectValue: value => ({ value }),
  },
};

freezeTestData(dataByType);

function makeTests(CollectionConstructor, collectionType, collectionSubtype) {
  const { array, sortedArray, objectValue } = dataByType[collectionSubtype];

  const testMethod = makeTestMethod(CollectionConstructor);

  describe(`${CollectionConstructor.name} sort function`, function() {
    testMethod('sort', t => {
      t.run(() => new CollectionConstructor(array).sort());
      t.expectCollectionYields(sortedArray);
    });

    testMethod('sort with comparator', t => {
      t.run(() =>
        new CollectionConstructor(array).sort((a: number, b: number) =>
          a < b ? 1 : b > a ? -1 : 0,
        ),
      );
      t.expectCollectionYields([...sortedArray].reverse());
    });

    testMethod('sortBy', t => {
      t.run(() =>
        new CollectionConstructor(array.map(objectValue)).sortBy((x: { value: number }) => x.value),
      );
      t.expectCollectionYields(sortedArray.map(objectValue));
    });

    testMethod('sortBy with comparator', t => {
      t.run(() =>
        new CollectionConstructor(array.map(objectValue)).sortBy(
          (x: { value: number }) => x.value,
          (a: number, b: number) => (a < b ? 1 : b > a ? -1 : 0),
        ),
      );
      t.expectCollectionYields(sortedArray.map(objectValue).reverse());
    });
  });
}

makeTests(SetSequence, 'Sequence', 'Duplicated');
makeTests(IndexedSequence, 'Sequence', 'Indexed');
makeTests(KeyedSequence, 'Sequence', 'Keyed');
makeTests(Set, 'Concrete', 'Duplicated');
makeTests(List, 'Concrete', 'Indexed');
makeTests(Map, 'Concrete', 'Keyed');
