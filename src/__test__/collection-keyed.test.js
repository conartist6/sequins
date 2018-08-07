import makeTestMethod from './helpers/make-test-method';
import KeyedSequence from '../subtypes/sequence/keyed';
import SequinsMap from '../subtypes/concrete/map';
import testData from './data';

function makeTests(KeyedConstructor, description) {
  describe(description, function() {
    let keyed;

    const { keys, values, entries, calls, array } = testData.Keyed;

    const testMethod = makeTestMethod(KeyedConstructor);

    beforeEach(function() {
      keyed = new KeyedConstructor(entries);
    });

    testMethod('tap')
      .callback(() => null, calls)
      .run(tapFn => keyed.tap(tapFn))
      .expectCollectionYields(entries);

    testMethod('map')
      .callback(val => val + 1, calls)
      .run(mapFn => keyed.map(mapFn))
      .expectCollectionYields([[9, 2], [8, 3], [7, 4]]);

    testMethod('mapKeys')
      .callback(key => key - 1, entries)
      .run(mapFn => keyed.mapKeys(mapFn))
      .expectCollectionYields([[8, 1], [7, 2], [6, 3]]);

    testMethod('mapEntries')
      .callback(([key, val]) => [val, key])
      .expectCalls([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]])
      .run(mapFn => keyed.mapEntries(mapFn))
      .expectCollectionYields([[1, 9], [2, 8], [3, 7]]);

    testMethod('flatMap (KeyedSequences)')
      .callback(val => new KeyedSequence([[val + 1, val + 2]]))
      .expectCalls(calls)
      .run(mapFn => keyed.flatMap(mapFn))
      .expectCollectionYields([[2, 3], [3, 4], [4, 5]]);

    testMethod('flatMap (Maps)')
      .callback(val => new Map([[val + 1, val + 2]]))
      .expectCalls(calls)
      .run(mapFn => keyed.flatMap(mapFn))
      .expectCollectionYields([[2, 3], [3, 4], [4, 5]]);

    testMethod('filter')
      .callback(val => val > 1, calls)
      .run(filterFn => keyed.filter(filterFn))
      .expectCollectionYields(entries.slice(1));

    testMethod('filterNot')
      .callback(val => val > 1, calls)
      .run(filterFn => keyed.filterNot(filterFn))
      .expectCollectionYields(entries.slice(0, 1));

    testMethod('reduce')
      .callback((acc, val, key) => acc + val)
      .expectCalls([[1, 2, 8], [3, 3, 7]])
      .run(reducerFn => keyed.reduce(reducerFn))
      .expectReturns(6);

    testMethod('forEach')
      .callback(() => true, calls)
      .run(eachFn => keyed.forEach(eachFn))
      .expectReturns(3);

    it('can be converted to IndexedSeq (noop)', function() {
      const indexed = keyed.toIndexedSeq();
      expect(Array.from(indexed)).toEqual(values);
      expect(indexed).toBeInstanceOf(IndexedSeq);
    });

    it('can be converted to KeyedSeq (noop)', function() {
      expect(keyed.toKeyedSeq()).toBe(keyed);
    });

    it('can be converted to SetSeq', function() {
      const set = keyed.toSetSeq();
      expect(Array.from(set)).toEqual(values);
      expect(set).toBeInstanceOf(SetSeq);
    });

    it('can be converted to Array', function() {
      expect(keyed.toArray()).toEqual(values);
    });

    it('can be converted to Object', function() {
      expect(keyed.toObject()).toEqual({ 9: 1, 8: 2, 7: 3 });
    });

    it('can be converted to List', function() {
      expect(keyed.toList()).toEqual(new List(values));
    });

    it('can be converted to Map', function() {
      expect(keyed.toMap()).toEqual(new Map(keyed));
    });

    it('can be converted to Set', function() {
      expect(keyed.toSet()).toEqual(new Set(values));
    });

    it('has keys iterator', function() {
      expect(Array.from(keyed.keys())).toEqual(keys);
    });

    it('has values iterator', function() {
      expect(Array.from(keyed.values())).toEqual(values);
    });

    it('has entries iterator', function() {
      expect(Array.from(keyed.entries())).toEqual(entries);
    });

    it('can be converted to a key sequence', function() {
      const keySeq = keyed.keySeq();
      expect(keySeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(keySeq)).toEqual(keys);
    });

    it('can be converted to a value sequence', function() {
      const valueSeq = keyed.valueSeq();
      expect(valueSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(valueSeq)).toEqual(values);
    });

    it('can be converted to an entries sequence', function() {
      const entriesSeq = keyed.entrySeq();
      expect(entriesSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(entriesSeq)).toEqual(entries);
    });
  });
}

makeTests(KeyedSequence, 'KeyedSequence');
makeTests(SequinsMap, 'Map');
