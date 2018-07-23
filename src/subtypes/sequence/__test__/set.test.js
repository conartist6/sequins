import IndexedSeq from '../indexed';
import KeyedSeq from '../keyed';
import SetSeq from '../set';

describe('Seq.Set', function() {
  describe('basic functionality', function() {
    let array;
    let calls;
    let set;
    let entries;

    beforeAll(function() {
      array = [1, 2, 3];
      entries = [[1, 1], [2, 2], [3, 3]];
      calls = entries;
    });

    beforeEach(function() {
      set = new SetSeq(array);
    });

    it('has the identity property', function() {
      expect(Array.from(set)).toEqual(array);
    });

    it('can concat', function() {
      expect(Array.from(new SetSeq([1, 2]).concat([3, 4]))).toEqual([1, 2, 3, 4]);
    });

    it('can reverse', function() {
      expect(Array.from(set.reverse())).toEqual([...array].reverse());
    });

    it('can be converted to IndexedSeq', function() {
      const indexed = set.toIndexedSeq();
      expect(Array.from(indexed)).toEqual([1, 2, 3]);
      expect(indexed).toBeInstanceOf(IndexedSeq);
    });

    it('can be converted to KeyedSeq', function() {
      const keyed = set.toKeyedSeq();
      expect(Array.from(keyed)).toEqual(entries);
      expect(keyed).toBeInstanceOf(KeyedSeq);
    });

    it('can be converted to SetSeq (noop)', function() {
      expect(set.toSetSeq()).toBe(set);
    });

    it('can be converted to Array', function() {
      expect(set.toArray()).toEqual(array);
    });

    it('can be converted to Object', function() {
      expect(set.toObject()).toEqual({ 1: 1, 2: 2, 3: 3 });
    });

    it('can be converted to Map', function() {
      expect(set.toMap()).toEqual(new Map(entries));
    });

    it('can be converted to Set', function() {
      expect(set.toSet()).toEqual(new Set(array));
    });

    it('can be converted to native', function() {
      expect(set.toNative()).toEqual(set.toSet());
    });

    it('has keys iterator', function() {
      expect(Array.from(set.keys())).toEqual(array);
    });

    it('has values iterator', function() {
      expect(Array.from(set.values())).toEqual(array);
    });

    it('has entries iterator', function() {
      expect(Array.from(set.entries())).toEqual(entries);
    });

    it('can be converted to a key sequence', function() {
      const keySeq = set.keySeq();
      expect(keySeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(keySeq)).toEqual(array);
    });

    it('can be converted to a value sequence', function() {
      const valueSeq = set.valueSeq();
      expect(valueSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(valueSeq)).toEqual(array);
    });

    it('can be converted to an entries sequence', function() {
      const entriesSeq = set.entrySeq();
      expect(entriesSeq).toBeInstanceOf(IndexedSeq);
      expect(Array.from(entriesSeq)).toEqual(entries);
    });
  });
});
