import { List, Set, Map, SetSequence } from '../../..';
import testData from '../../../__test__/data';

const { array } = testData.Duplicated;

describe('Set', function() {
  let set: Set<number>;

  beforeEach(function() {
    set = new Set(array);
  });

  it('can has', function() {
    expect(set.has(1)).toBe(true);
    expect(set.has(3)).toBe(true);
    expect(set.has(0)).toBe(false);
  });

  it('can add', function() {
    expect(set.add(22)).toBe(set);
    expect(set.has(22)).toBe(true);
    expect(Array.from(set)).toEqual([1, 2, 3, 22]);
  });

  it('can union', function() {
    expect(set.union()).toEqual(set);
    expect(set.union(set)).toEqual(set);
    expect(set.union(new Set())).toEqual(set);
    expect(set.union([4, 5, 6])).toEqual(new Set([...array, 4, 5, 6]));
    expect(set.union(new Set([4, 5, 6]))).toEqual(new Set([...array, 4, 5, 6]));
  });

  it('can intersect', function() {
    expect(set.intersect()).toEqual(set);
    expect(set.intersect(set)).toEqual(set);
    expect(set.intersect(new Set())).toEqual(new Set());
    expect(set.intersect([...array, 4, 5, 6])).toEqual(set);
    expect(set.intersect([4, 5, 6])).toEqual(new Set());
  });
});

describe('Set statics', function() {
  describe('Set.of', function() {
    it('can create a set', function() {
      const set = Set.of(...array);
      expect(set).toBeInstanceOf(Set);
      expect(Array.from(set)).toEqual(array);
    });
  });

  describe('Set.isSet', function() {
    it('returns true when passed a set', function() {
      expect(Set.isSet(new Set())).toBe(true);
    });

    it('returns false when passed something other than a set', function() {
      expect(Set.isSet([])).toBe(false);
      expect(Set.isSet(Set)).toBe(false);
      expect(Set.isSet(new Map())).toBe(false);
      expect(Set.isSet(new SetSequence(array))).toBe(false);
    });
  });

  describe('Set.union', function() {
    it('returns a Set containing members of all given iterable arguments', function() {
      expect(Set.union()).toEqual(new Set());
      expect(Set.union(new Set(array))).toEqual(new Set(array));
      expect(Set.union(new Set(array), new Set(array))).toEqual(new Set(array));
      expect(Set.union(array, array)).toEqual(new Set(array));
      expect(Set.union(array, new Set([4, 5, 6]))).toEqual(new Set([...array, 4, 5, 6]));
    });

    it('uses values when input iterables are associative', function() {
      expect(
        Set.union(new Map([[1, 1], [2, 2], [3, 3]]), new Map([[44, 4], [55, 5], [66, 6]])),
      ).toEqual(new Set([1, 2, 3, 4, 5, 6]));
    });
  });

  describe('Set.intersect', function() {
    it('returns a Set containing only members present in all given iterables', function() {
      expect(Set.intersect()).toEqual(new Set());
      expect(Set.intersect(new Set())).toEqual(new Set());
      expect(Set.intersect(new Set(), [])).toEqual(new Set());
      expect(Set.intersect(new Set(array), [])).toEqual(new Set());
      expect(Set.intersect(new Set(), array)).toEqual(new Set());
      expect(Set.intersect(new Set(array), array)).toEqual(new Set(array));
      expect(Set.intersect(array, [...array, 4, 5, 6])).toEqual(new Set(array));
      expect(Set.intersect(array, [4, 5, 6])).toEqual(new Set());
    });

    it('uses values when input iterables are associative', function() {
      expect(
        Set.intersect(new Map([[1, 1], [2, 2], [3, 3]]), new Map([[11, 1], [12, 2], [13, 3]])),
      ).toEqual(new Set([1, 2, 3]));
    });
  });

  describe('Set.fromKeys', function() {
    it('can create a set from keys', function() {
      expect(Set.fromKeys()).toEqual(new Set());
      expect(Set.fromKeys(new Set(array))).toEqual(new Set(array));
      expect(Set.fromKeys(new List(array))).toEqual(new Set([0, 1, 2]));
      expect(Set.fromKeys({ 1: 11, 2: 22, 3: 33 })).toEqual(new Set(['1', '2', '3']));
      expect(Set.fromKeys(new Map(array.map(x => [x, x])))).toEqual(new Set(array));
    });
  });
});
