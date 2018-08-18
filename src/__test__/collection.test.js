import makeTestMethod from './helpers/make-test-method';
import { IndexedSeq, KeyedSeq, SetSeq, List, Map, Set } from '..';
import { Collection } from '../collection-mixin';
import makeFlatten from '../factories/flatten';
import testDataByType from './data';

function makeTests(type, collectionSubtype, description) {
  const CollectionConstructor = Collection[collectionSubtype][type];

  describe(CollectionConstructor.name, function() {
    let collection;

    const { keys, values, entries, calls, array, object, js } = testDataByType[type];

    const testMethod = makeTestMethod(CollectionConstructor);

    beforeEach(() => {
      collection = new CollectionConstructor(array);
    });

    it('has the identity property', function() {
      expect(Array.from(array)).toEqual(array);
    });

    it('can flatten', function() {
      // The flatten implementation has its own tests
      const flatten = makeFlatten(Collection, collectionSubtype, type);
      const result = collection.flatten();
      expect(result).toBeInstanceOf(CollectionConstructor);
      expect(collection.flatten(true)).toBeIterable(expect.yieldsEqual(flatten(true, collection)));
    });

    // testMethod('mapEntries')
    //   .callback(([key, val]) => [val, key])
    //   .expectCalls([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]])
    //   .run(mapFn => keyed.mapEntries(mapFn))
    //   .expectCollectionYields([[1, 9], [2, 8], [3, 7]]);

    it('can toJS', function() {
      expect(collection.toJS()).toEqual(js);
    });

    it('can reverse', function() {
      expect(Array.from(collection.reverse())).toEqual([...array].reverse());
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

    it('can be converted to IndexedSeq', function() {
      const indexed = collection.toIndexedSeq();
      expect(Array.from(indexed)).toEqual(values);
      expect(indexed).toBeInstanceOf(IndexedSeq);
    });

    it('can be converted to KeyedSeq', function() {
      const keyed = collection.toKeyedSeq();
      expect(keyed).toBeInstanceOf(KeyedSeq);
      expect(Array.from(keyed)).toEqual(entries);
    });

    it('can be converted to SetSeq', function() {
      const set = collection.toSetSeq();
      expect(Array.from(set)).toEqual(values);
      expect(set).toBeInstanceOf(SetSeq);
    });

    it('can be converted to Array', function() {
      expect(collection.toArray()).toEqual(values);
    });

    it('can be converted to Object', function() {
      expect(collection.toObject()).toEqual(object);
    });

    it('can be converted to List', function() {
      expect(collection.toList()).toEqual(new List(values));
    });

    it('can be converted to Map', function() {
      expect(collection.toMap()).toEqual(new Map(entries));
    });

    it('can be converted to Set', function() {
      expect(collection.toSet()).toEqual(new Set(values));
    });

    it('has keys iterator', function() {
      expect(Array.from(collection.keys())).toEqual(keys);
    });

    it('has values iterator', function() {
      expect(Array.from(collection.values())).toEqual(values);
    });

    it('has entries iterator', function() {
      expect(Array.from(collection.entries())).toEqual(entries);
    });

    it('can be converted to a key sequence', function() {
      const keySeq = collection.keySeq();
      expect(keySeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(keySeq)).toEqual(keys);
    });

    it('can be converted to a value sequence', function() {
      const valueSeq = collection.valueSeq();
      expect(valueSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(valueSeq)).toEqual(values);
    });

    it('can be converted to an entries sequence', function() {
      const entriesSeq = collection.entrySeq();
      expect(entriesSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(entriesSeq)).toEqual(entries);
    });
  });
}

makeTests('Indexed', 'Sequence');
makeTests('Keyed', 'Sequence');
makeTests('Set', 'Sequence');
makeTests('Indexed', 'Concrete');
makeTests('Keyed', 'Concrete');
makeTests('Set', 'Concrete');
