import { keys, values, entries, SetSequence, Set, Map, List } from '../..';
import testData from '../../__test__/data';

const { Keyed: keyedData, Indexed: indexedData, Duplicated: setData } = testData;

describe('keys', function() {
  it('gets the keys of any iterable or object input', function() {
    expect(keys(keyedData.object)).toEqual(new SetSequence(keyedData.objectKeys));
    expect(keys(indexedData.array)).toEqual(new SetSequence(indexedData.keys));
    expect(keys(new List(indexedData.array))).toEqual(new SetSequence(indexedData.keys));
    expect(keys(new Map(keyedData.array))).toEqual(new SetSequence(keyedData.keys));
    expect(keys(new Set(setData.array))).toEqual(new SetSequence(setData.keys));
  });
});

describe('values', function() {
  it('gets the values of any iterable or object input', function() {
    expect(values(keyedData.object)).toEqual(new SetSequence(keyedData.objectValues));
    expect(values(indexedData.array)).toEqual(new SetSequence(indexedData.values));
    expect(values(new List(indexedData.array))).toEqual(new SetSequence(indexedData.values));
    expect(values(new Map(keyedData.array))).toEqual(new SetSequence(keyedData.values));
    expect(values(new Set(setData.array))).toEqual(new SetSequence(setData.values));
  });
});

describe('entries', function() {
  it('gets the entries of any iterable or object input', function() {
    expect(entries(keyedData.object)).toEqual(new SetSequence(keyedData.objectEntries));
    expect(entries(indexedData.array)).toEqual(new SetSequence(indexedData.entries));
    expect(entries(new List(indexedData.array))).toEqual(new SetSequence(indexedData.entries));
    expect(entries(new Map(keyedData.array))).toEqual(new SetSequence(keyedData.entries));
    expect(entries(new Set(setData.array))).toEqual(new SetSequence(setData.entries));
  });
});
