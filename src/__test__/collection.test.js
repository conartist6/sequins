import makeTestMethod from './helpers/make-test-method';
import { IndexedSeq, KeyedSeq, SetSeq, List, Map, Set } from '../index';
import { Namespace as Collection } from '../collection';
import makeFlatten from '../factories/flatten';
import testData, { makeCalls } from './data';

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

      it('can reverse', function() {
        expect(Array.from(collection.reverse())).toEqual([...array].reverse());
      });

      it('can be converted to Seq', function() {
        const seq = collection.toSeq();
        expect(Array.from(seq)).toEqual(array);
        expect(seq).toBeInstanceOf(Collection.Sequence[collectionSubtype]);
      });

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
    });
  });
}

makeTests('Sequence', 'Indexed');
makeTests('Sequence', 'Keyed');
makeTests('Sequence', 'Set');
makeTests('Concrete', 'Indexed');
makeTests('Concrete', 'Keyed');
makeTests('Concrete', 'Set');
