import IndexedSeq from '../sequence-indexed';
import KeyedSeq from '../sequence-keyed';
import SetSeq from '../sequence-set';

describe('Seq.Indexed', function() {
  describe('basic functionality', function() {
    let array;
    let indexed;
    let calls;
    let keys;
    let values;
    let entries;

    beforeAll(function() {
      keys = [0, 1, 2];
      values = [1, 2, 3];
      entries = [[0, 1], [1, 2], [2, 3]];
      calls = [[1, 0], [2, 1], [3, 2]];
      array = [1, 2, 3];
    });

    beforeEach(function() {
      indexed = new IndexedSeq(array);
    });

    it('has the identity property', function() {
      expect(Array.from(indexed)).toEqual(array);
    });

    it('can concat', function() {
      expect(Array.from(new IndexedSeq([1, 2]).concat([3, 4]))).toEqual([1, 2, 3, 4]);
    });

    it('can map', function() {
      const mapFn = val => val + 1;
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(indexed.map(mapMockFn))).toEqual(array.map(mapFn));
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can flatMap IndexedSequences', function() {
      const mapFn = val => new IndexedSeq([val + 1, val + 1.5]);
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(indexed.flatMap(mapMockFn))).toEqual([2, 2.5, 3, 3.5, 4, 4.5]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can flatMap Arrays', function() {
      const mapFn = val => [val + 1, val + 1.5];
      const mapMockFn = jest.fn(mapFn);
      expect(Array.from(indexed.flatMap(mapMockFn))).toEqual([2, 2.5, 3, 3.5, 4, 4.5]);
      expect(mapMockFn.mock.calls).toEqual(calls);
    });

    it('can tap', function() {
      const tapFn = jest.fn();
      Array.from(indexed.tap(tapFn));
      expect(tapFn.mock.calls).toEqual(calls);
    });

    it('can filter', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(indexed.filter(filterMockFn))).toEqual(array.filter(filterFn));
      expect(filterMockFn.mock.calls).toEqual(calls);
    });

    it('can filterNot', function() {
      const filterFn = val => val > 1;
      const filterMockFn = jest.fn(filterFn);
      expect(Array.from(indexed.filterNot(filterMockFn))).toEqual(
        array.filter(val => !filterFn(val)),
      );
      expect(filterMockFn.mock.calls).toEqual(calls);
    });

    it('can reverse', function() {
      expect(Array.from(indexed.reverse())).toEqual([...array].reverse());
    });

    it('can reduce', function() {
      const reducer = (acc, val) => acc + val;
      const reducerMockFn = jest.fn(reducer);
      expect(indexed.reduce(reducerMockFn)).toBe(6);
      expect(reducerMockFn.mock.calls).toEqual([[1, 2, 1], [3, 3, 2]]);
    });

    it('can forEach', function() {
      const eachFn = jest.fn();
      expect(indexed.forEach(eachFn)).toBe(3);
      expect(eachFn.mock.calls).toEqual(calls);
    });

    it('can be converted to IndexedSeq (noop)', function() {
      expect(indexed.toIndexedSeq()).toBe(indexed);
    });

    it('can be converted to KeyedSeq', function() {
      const keyed = indexed.toKeyedSeq();
      expect(Array.from(keyed)).toEqual(entries);
      expect(keyed).toBeInstanceOf(KeyedSeq);
    });

    it('can be converted to SetSeq', function() {
      const set = indexed.toSetSeq();
      expect(Array.from(set)).toEqual(values);
      expect(set).toBeInstanceOf(SetSeq);
    });

    it('can be converted to Array', function() {
      expect(indexed.toArray()).toEqual(array);
    });

    it('can be converted to Object', function() {
      expect(indexed.toObject()).toEqual({ 0: 1, 1: 2, 2: 3 });
    });

    it('can be converted to Map', function() {
      expect(indexed.toMap()).toEqual(new Map(entries));
    });

    it('can be converted to Set', function() {
      expect(indexed.toSet()).toEqual(new Set(indexed));
    });

    it('can be converted to native', function() {
      expect(indexed.toNative()).toEqual(indexed.toArray());
    });

    it('has keys iterator', function() {
      expect(Array.from(indexed.keys())).toEqual(keys);
    });

    it('has values iterator', function() {
      expect(Array.from(indexed.values())).toEqual(array);
    });

    it('has entries iterator', function() {
      expect(Array.from(indexed.entries())).toEqual(entries);
    });

    it('can be converted to a key sequence', function() {
      const keySeq = indexed.keySeq();
      expect(keySeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(keySeq)).toEqual(keys);
    });

    it('can be converted to a value sequence', function() {
      const valueSeq = indexed.valueSeq();
      expect(valueSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(valueSeq)).toEqual(values);
    });

    it('can be converted to an entries sequence', function() {
      const entriesSeq = indexed.entrySeq();
      expect(entriesSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(entriesSeq)).toEqual(entries);
    });
  });
});
