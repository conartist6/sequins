import makeTestMethod from './helpers/make-test-method';
import { IndexedSequence, KeyedSequence, SetSequence, List, Map, Set } from '../index';
import { Namespace as Collection } from '../collection';
import makeFlatten from '../factories/flatten';
import testData, { makeCalls } from './data';
import { map } from 'iter-tools';

function makeTests(collectionType, collectionSubtype) {
  const CollectionConstructor = Collection[collectionType][collectionSubtype];

  describe(CollectionConstructor.name, function() {
    let collection;

    const { keys, values, entries, calls: rawCalls, array, object, js } = testData[
      collectionSubtype
    ];

    const callbackCollection =
      collectionType == 'Concrete' ? new CollectionConstructor(array) : null;
    const calls = makeCalls(rawCalls, callbackCollection);

    const testMethod = makeTestMethod(CollectionConstructor);

    it('can be constructed from an array', function() {
      const collection = new CollectionConstructor(array);
      expect(collection).toBeInstanceOf(CollectionConstructor);
      expect(Array.from(collection)).toEqual(array);
    });

    it('can be constructed from an iterable', function() {
      const collection = new CollectionConstructor(map(x => x, array));
      expect(collection).toBeInstanceOf(CollectionConstructor);
      expect(Array.from(collection)).toEqual(array);
    });

    describe('instance methods', function() {
      beforeEach(() => {
        collection = new CollectionConstructor(array);
      });

      it('has the identity property', function() {
        expect(Array.from(array)).toEqual(array);
      });

      it('can toJS', function() {
        expect(collection.toJS()).toEqual(js);
      });

      it('can be converted to Seq', function() {
        const seq = collection.toSeq();
        expect(Array.from(seq)).toEqual(array);
        expect(seq).toBeInstanceOf(Collection.Sequence[collectionSubtype]);
      });

      it('can be converted to IndexedSequence', function() {
        const indexed = collection.toIndexedSeq();
        expect(Array.from(indexed)).toEqual(values);
        expect(indexed).toBeInstanceOf(IndexedSequence);
      });

      it('can be converted to KeyedSequence', function() {
        const keyed = collection.toKeyedSeq();
        expect(keyed).toBeInstanceOf(KeyedSequence);
        expect(Array.from(keyed)).toEqual(entries);
      });

      it('can be converted to SetSequence', function() {
        const set = collection.toSetSeq();
        expect(Array.from(set)).toEqual(values);
        expect(set).toBeInstanceOf(SetSequence);
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

      it('can be converted to a key sequence', function() {
        const keySeq = collection.keys();
        expect(keySeq).toBeInstanceOf(SetSequence);
        expect(Array.from(keySeq)).toEqual(keys);
      });

      it('can be converted to a value sequence', function() {
        const valueSeq = collection.values();
        expect(valueSeq).toBeInstanceOf(SetSequence);
        expect(Array.from(valueSeq)).toEqual(values);
      });

      it('can be converted to an entries sequence', function() {
        const entriesSeq = collection.entries();
        expect(entriesSeq).toBeInstanceOf(KeyedSequence);
        expect(Array.from(entriesSeq)).toEqual(entries);
      });

      testMethod('forEach', t => {
        t.callback(() => true, calls);
        t.run(eachFn => collection.forEach(eachFn));
        t.expectReturns(collection);
      });

      testMethod('forSome', t => {
        t.callback(value => value < 2);
        t.expectCalls(calls.slice(0, 2));
        t.run(eachFn => collection.forSome(eachFn));
        t.expectReturns(2);
      });

      testMethod('filter', t => {
        t.callback(val => val > 1, calls);
        t.run(filterFn => collection.filter(filterFn));
        t.expectCollectionYields(array.slice(1));
      });

      testMethod('filterNot', t => {
        t.callback(val => val > 1, calls);
        t.run(filterFn => collection.filterNot(filterFn));
        t.expectCollectionYields(array.slice(0, 1));
      });

      testMethod('reverse', t => {
        t.run(() => collection.reverse());
        t.expectCollectionYields([...array].reverse());
      });

      testMethod('count', t => {
        t.run(() => collection.count());
        t.expectReturns(3);
      });

      testMethod('count with predicate', t => {
        t.callback(val => val > 1, calls);
        t.run(filterFn => collection.count(filterFn));
        t.expectReturns(2);
      });
    });
  });
}

makeTests('Sequence', 'Duplicated');
makeTests('Sequence', 'Indexed');
makeTests('Sequence', 'Keyed');
makeTests('Concrete', 'Duplicated');
makeTests('Concrete', 'Indexed');
makeTests('Concrete', 'Keyed');
