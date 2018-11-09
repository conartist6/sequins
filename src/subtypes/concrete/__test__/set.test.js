import { List, Set, SetSequence } from '../../../index';

const array = Object.freeze([1, 2, 3]);

describe('Set', function() {
  let set;

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
});

describe('Set statics', function() {
  it('can create a set with Set.of', function() {
    const set = Set.of(...array);
    expect(set).toBeInstanceOf(Set);
    expect(Array.from(set)).toEqual(array);
  });

  it('can detect a set with Set.isSet', function() {
    expect(Set.isSet(new Set())).toBe(true);
  });

  it('Set.isSet returns false for non-lists', function() {
    expect(Set.isSet([])).toBe(false);
    expect(Set.isSet(Set)).toBe(false);
    expect(Set.isSet(new Map())).toBe(false);
    expect(Set.isSet(new SetSequence(array))).toBe(false);
  });
});
