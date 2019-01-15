import makeTestMethod from './helpers/make-test-method';
import { List, Map, Set } from '..';
import testData from './data';

function makeTests(ConcreteConstructor, collectionType, collectionSubtype) {
  describe(ConcreteConstructor.name, function() {
    let collection: ConcreteConstructor<number, number>;

    const { keys, values, entries, calls, array, object, js } = testData[collectionSubtype];

    const testMethod = makeTestMethod(ConcreteConstructor);

    describe('empty', function() {
      describe('instance methods', function() {
        beforeEach(() => {
          collection = new ConcreteConstructor();
        });

        it('has 0 size', function() {
          expect(collection.size).toBe(0);
        });

        it('isEmpty', function() {
          expect(collection.isEmpty()).toBe(true);
        });
      });
    });

    describe('instance methods', function() {
      beforeEach(() => {
        collection = new ConcreteConstructor(array);
      });

      it('has size', function() {
        expect(collection.size).toBe(array.length);
      });

      it('has isEmpty', function() {
        expect(collection.isEmpty()).toBe(false);
      });

      it('can clear', function() {
        expect(collection.clear()).toBe(collection);
        expect(Array.from(collection)).toEqual([]);
      });
    });
  });
}

makeTests(Set, 'Concrete', 'Duplicated');
makeTests(List, 'Concrete', 'Indexed');
makeTests(Map, 'Concrete', 'Keyed');
