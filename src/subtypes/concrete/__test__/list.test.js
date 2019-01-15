import { List, Map, IndexedSequence } from '../../..';
import testData from '../../../__test__/data';

const { array } = testData.Indexed;

describe('List', function() {
  let list: List<number>;

  beforeEach(function() {
    list = new List(array);
  });

  it('can get', function() {
    expect(list.get(0)).toBe(1);
    expect(list.get(2)).toBe(3);
    expect(list.get(3)).toBeUndefined();
  });

  it('can set', function() {
    expect(list.set(1, 22)).toBe(list);
    expect(list.get(1)).toBe(22);
    expect(Array.from(list)).toEqual([1, 22, 3]);
  });

  it('can push', function() {
    expect(list.push(4)).toBe(list);
    expect(Array.from(list)).toEqual([1, 2, 3, 4]);
  });

  it('can pop', function() {
    expect(list.pop()).toBe(3);
    expect(Array.from(list)).toEqual([1, 2]);
  });

  it('can shift', function() {
    expect(list.shift()).toBe(1);
    expect(Array.from(list)).toEqual([2, 3]);
  });

  it('can unshift', function() {
    expect(list.unshift(0)).toBe(list);
    expect(Array.from(list)).toEqual([0, 1, 2, 3]);
  });
});

describe('List statics', function() {
  it('can create a list with List.of', function() {
    const list = List.of(...array);
    expect(list).toBeInstanceOf(List);
    expect(Array.from(list)).toEqual(array);
  });

  it('can detect a list with List.isList', function() {
    expect(List.isList(new List())).toBe(true);
  });

  it('List.isList returns false for non-lists', function() {
    expect(List.isList([])).toBe(false);
    expect(List.isList(List)).toBe(false);
    expect(List.isList(new Map())).toBe(false);
    expect(List.isList(new IndexedSequence(array))).toBe(false);
  });
});
