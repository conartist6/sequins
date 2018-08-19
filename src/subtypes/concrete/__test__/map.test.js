import SequinsMap from '../map';

describe('SequinsMap', function() {
  let calls;
  let values;
  let keys;
  let keyed;
  let entries;

  beforeEach(function() {
    values = [1, 2, 3];
    keys = [9, 8, 7];
    entries = [[9, 1], [8, 2], [7, 3]];
    calls = [[1, 9], [2, 8], [3, 7]];
    keyed = new SequinsMap(entries);
  });

  it('is a subtype of native Map', function() {
    expect(SequinsMap.prototype).toBeInstanceOf(Map);
  });

  it('can map', function() {
    const mapFn = val => val + 1;
    const mapMockFn = jest.fn(mapFn);
    expect(keyed.map(mapMockFn)).toEqual(new SequinsMap([[9, 2], [8, 3], [7, 4]]));
    expect(mapMockFn.mock.calls).toEqual(calls);
  });

  it('can mapKeys', function() {
    const mapFn = key => key - 1;
    const mapMockFn = jest.fn(mapFn);
    expect(keyed.mapKeys(mapMockFn)).toEqual(new SequinsMap([[8, 1], [7, 2], [6, 3]]));
    expect(mapMockFn.mock.calls).toEqual(entries);
  });

  it('can mapEntries', function() {
    const mapFn = ([key, val]) => [val, key];
    const mapMockFn = jest.fn(mapFn);
    expect(keyed.mapEntries(mapMockFn)).toEqual(new SequinsMap([[1, 9], [2, 8], [3, 7]]));
    expect(mapMockFn.mock.calls).toEqual([[[9, 1], 0], [[8, 2], 1], [[7, 3], 2]]);
  });
});
