import makeTestMethod from './helpers/make-test-method';
import {
  IndexedSequence,
  KeyedSequence,
  SetSequence,
  List,
  Map,
  Set,
  NativeMap,
  NativeSet,
} from '..';
import { Namespace as Collection } from '../collection';
import testData, { makeCalls } from './data';
import { map } from 'iter-tools';

function makeTests(CollectionConstructor, collectionType, collectionSubtype) {
  const ConcreteConstructor = Collection.Concrete[collectionSubtype];

  describe(CollectionConstructor.name, function() {
    let collection: CollectionConstructor<number, number>;

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
        const indexed = collection.to(IndexedSequence);
        expect(Array.from(indexed)).toEqual(values);
        expect(indexed).toBeInstanceOf(IndexedSequence);
      });

      it('can be converted to KeyedSequence', function() {
        const keyed = collection.to(KeyedSequence);
        expect(keyed).toBeInstanceOf(KeyedSequence);
        expect(Array.from(keyed)).toEqual(entries);
      });

      it('can be converted to SetSequence', function() {
        const set = collection.to(SetSequence);
        expect(Array.from(set)).toEqual(values);
        expect(set).toBeInstanceOf(SetSequence);
      });

      it('can be converted to List', function() {
        expect(collection.to(List)).toEqual(new List(values));
      });

      it('can be converted to Map', function() {
        expect(collection.to(Map)).toEqual(new Map(entries));
      });

      it('can be converted to Set', function() {
        expect(collection.to(Set)).toEqual(new Set(values));
      });

      //       it('can be converted to native Map', function() {
      //         expect(collection.to(NativeMap)).toEqual(new NativeMap(entries));
      //       });
      //
      //       it('can be converted to native Set', function() {
      //         expect(collection.to(NativeSet)).toEqual(new NativeSet(values));
      //       });

      it('can be converted to Array', function() {
        expect(collection.to(Array)).toEqual(values);
      });

      it('can be converted to Object', function() {
        expect(collection.to(Object)).toEqual(object);
      });

      it('can be converted to a concrete collection', function() {
        expect(collection.toConcrete()).toEqual(new ConcreteConstructor(array));
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
        expect(entriesSeq).toBeInstanceOf(SetSequence);
        expect(Array.from(entriesSeq)).toEqual(entries);
      });

      testMethod('forEach', mt => {
        const voidValue: void = undefined;

        mt.callback(() => true, calls)
          .expectReturns(voidValue)
          .run(eachFn => collection.forEach(eachFn));
      });

      testMethod('forSome', mt => {
        mt.callback((val: number) => val < 2)
          .expectCalls(calls.slice(0, 2))
          .expectReturns(2)
          .run(eachFn => collection.forSome(eachFn));
      });

      testMethod('filter', mt => {
        mt.callback((val: number) => val > 1, calls)
          .expectCollectionYields(array.slice(1))
          .run(filterFn => collection.filter(filterFn));
      });

      testMethod('filterNot', mt => {
        mt.callback((val: number) => val > 1, calls)
          .expectCollectionYields(array.slice(0, 1))
          .run(filterFn => collection.filterNot(filterFn));
      });

      testMethod('reverse', mt => {
        mt.expectCollectionYields([...array].reverse()) //
          .run(() => collection.reverse());
      });

      testMethod('count', mt => {
        mt.expectReturns(3) //
          .run(() => collection.count());
      });

      testMethod('count with predicate', mt => {
        mt.callback((val: number) => val > 1, calls)
          .expectReturns(2)
          .run(filterFn => collection.count(filterFn));
      });
    });
  });
}

makeTests(SetSequence, 'Sequence', 'Duplicated');
makeTests(IndexedSequence, 'Sequence', 'Indexed');
makeTests(KeyedSequence, 'Sequence', 'Keyed');
makeTests(Set, 'Concrete', 'Duplicated');
makeTests(List, 'Concrete', 'Indexed');
makeTests(Map, 'Concrete', 'Keyed');
