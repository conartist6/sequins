import makeTestMethod from '../../__test__/helpers/make-test-method';
import { SetSequence } from '../../index';
import { Namespace as Collection } from '../../collection';
import makeGroupBy from '../group-by';
import { freezeTestData } from '../../__test__/data';

const dataByType = {
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
  Set: {
    array: [3, 2, 4, 1],
    sortedArray: [1, 2, 3, 4],
    objectValue: value => ({ value }),
  },
};

freezeTestData(dataByType);

function makeTests(type, collectionSubtype) {
  const CollectionConstructor = Collection[collectionSubtype][type];
  const KeyedCollectionConstructor = Collection[collectionSubtype].Keyed;

  const { array, sortedArray, objectValue } = dataByType[type];

  const testMethod = makeTestMethod(CollectionConstructor);

  describe(CollectionConstructor.name, function() {
    testMethod('sort', t => {
      t.run(() => new CollectionConstructor(array).sort());
      t.expectCollectionYields(sortedArray);
    });

    testMethod('sort with comparator', t => {
      t.run(() => new CollectionConstructor(array).sort((a, b) => a < b));
      t.expectCollectionYields([...sortedArray].reverse());
    });

    testMethod('sortBy', t => {
      t.run(() => new CollectionConstructor(array.map(objectValue)).sortBy(x => x.value));
      t.expectCollectionYields(sortedArray.map(objectValue));
    });

    testMethod('sortBy with comparator', t => {
      t.run(() =>
        new CollectionConstructor(array.map(objectValue)).sortBy(x => x.value, (a, b) => a < b),
      );
      t.expectCollectionYields(sortedArray.map(objectValue).reverse());
    });
  });
}

describe('sort', function() {
  makeTests('Indexed', 'Sequence');
  makeTests('Keyed', 'Sequence');
  makeTests('Set', 'Sequence');
  makeTests('Indexed', 'Concrete');
  makeTests('Keyed', 'Concrete');
  makeTests('Set', 'Concrete');
});
