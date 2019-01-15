import { List, Map, KeyedSequence } from '../../..';
import testData from '../../../__test__/data';

const { array } = testData.Keyed;

describe('Map', function() {
  let map: Map<number, number>;

  beforeEach(function() {
    map = new Map(array);
  });

  it('can get', function() {
    expect(map.get(9)).toBe(1);
    expect(map.get(7)).toBe(3);
    expect(map.get(0)).toBeUndefined();
  });

  it('can set', function() {
    expect(map.set(8, 22)).toBe(map);
    expect(map.get(8)).toBe(22);
    expect(Array.from(map)).toEqual([[9, 1], [8, 22], [7, 3]]);
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
