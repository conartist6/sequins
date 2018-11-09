import { IndexedSequence, KeyedSequence, SetSequence } from '../../index';
import { Namespace as Collection } from '../../collection';
import makeToJS from '../to-js';

describe('toJS', function() {
  let toJS;

  beforeAll(function() {
    toJS = makeToJS(Collection);
  });

  it('behaves like toJSON with flat structures', function() {
    const indexed = new IndexedSequence([1, 2, 3]);
    const keyed = new KeyedSequence([[1, 1], [2, 2], [3, 3]]);
    const set = new SetSequence([1, 2, 3]);
    expect(toJS(indexed)).toEqual([1, 2, 3]);
    expect(toJS(keyed)).toEqual({ 1: 1, 2: 2, 3: 3 });
    expect(toJS(set)).toEqual([1, 2, 3]);
  });

  it('converts nested sequences', function() {
    const seq = new SetSequence([
      'a',
      new KeyedSequence(['fox', 'far']),
      new IndexedSequence([]),
      new SetSequence([true, new KeyedSequence([[1, 2], [3, 4]])]),
    ]);
    expect(toJS(seq)).toEqual(['a', { f: 'a' }, [], [true, { '1': 2, '3': 4 }]]);
  });

  it('converts nested native data structures', function() {
    const seq = new IndexedSequence([
      new Map([['foo', 'bar']]),
      new Set(['socks', 'shoes']),
      ['bork', 'bork', 'bork'],
    ]);
    expect(toJS(seq)).toEqual([{ foo: 'bar' }, ['socks', 'shoes'], ['bork', 'bork', 'bork']]);
  });

  it('converts structures inside objects', function() {
    const seq = new KeyedSequence([
      ['moo', { value: new SetSequence(['moar']) }],
      [
        'i',
        {
          word: {
            am: 'groot',
          },
        },
      ],
    ]);
    expect(toJS(seq)).toEqual({
      moo: { value: ['moar'] },
      i: { word: { am: 'groot' } },
    });
  });
});
