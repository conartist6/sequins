import SequinsList from '../list';

describe('SequinsList', function() {
  const array = Object.freeze([1, 2, 3]);
  let list;

  beforeEach(function() {
    list = new SequinsList(array);
  });

  it('has size', function() {
    expect(list.size).toBe(3);
  });

  it('can get', function() {
    expect(list.get(0)).toBe(1);
    expect(list.get(2)).toBe(3);
    expect(list.get(3)).toBeUndefined();
  });

  it('can set', function() {
    expect(list.set(1, 22)).toBe(list);
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

  it('can clear', function() {
    expect(list.clear()).toBe(list);
    expect(Array.from(list)).toEqual([]);
  });

  it('can concat', function() {
    list = list.concat([1, 2, 3]);
    expect(list).toBeInstanceOf(SequinsList);
    expect(Array.from(list)).toEqual([...array, ...array]);
  });

  it('has keys iterator', function() {
    expect(Array.from(list.keys())).toEqual([0, 1, 2]);
  });

  it('has values iterator', function() {
    expect(Array.from(list.values())).toEqual(array);
  });
});
