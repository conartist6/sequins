import makeTestMethod from './helpers/make-test-method';
import '../index';
import { Namespace as Collection } from '../collection';
import makeFlatten from '../factories/flatten';
import testData from './data';

function makeTests(collectionSubtype) {
  const CollectionConstructor = Collection.Concrete[collectionSubtype];

  describe(CollectionConstructor.name, function() {
    let collection;

    const { keys, values, entries, calls, array, object, js } = testData[collectionSubtype];

    const testMethod = makeTestMethod(CollectionConstructor);

    describe('instance methods', function() {
      beforeEach(() => {
        collection = new CollectionConstructor(array);
      });

      it('has size', function() {
        expect(collection.size).toBe(array.length);
      });

      it('can clear', function() {
        expect(collection.clear()).toBe(collection);
        expect(Array.from(collection)).toEqual([]);
      });
    });
  });
}

makeTests('Identity');
makeTests('Indexed');
makeTests('Keyed');
