import { List, Map, KeyedSequence } from '../../../index';

const array = Object.freeze([[1, 1], [2, 2], [3, 3]]);

describe('Map', function() {
  let map;

  beforeEach(function() {
    map = new Map(array);
  });

  it('can get', function() {
    expect(map.get(1)).toBe(1);
    expect(map.get(3)).toBe(3);
    expect(map.get(0)).toBeUndefined();
  });

  it('can set', function() {
    expect(map.set(2, 22)).toBe(map);
    expect(map.get(2)).toBe(22);
    expect(Array.from(map)).toEqual([[1, 1], [2, 22], [3, 3]]);
  });
});

describe('Map statics', function() {
  it('can detect a map with Map.isMap', function() {
    expect(Map.isMap(new Map())).toBe(true);
  });

  it('Map.isMap returns false for non-maps', function() {
    expect(Map.isMap([])).toBe(false);
    expect(Map.isMap(Map)).toBe(false);
    expect(Map.isMap(new List())).toBe(false);
    expect(Map.isMap(new KeyedSequence(array))).toBe(false);
  });
});
