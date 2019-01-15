import { IndexedSequence, KeyedSequence, SetSequence } from '../..';
import testData from '../../__test__/data';

describe('toJS', function() {
  it('behaves like toJSON with flat structures', function() {
    const indexed = new IndexedSequence(testData.Indexed.array);
    const keyed = new KeyedSequence(testData.Keyed.array);
    const set = new SetSequence(testData.Duplicated.array);
    expect(indexed.toJS()).toEqual(testData.Indexed.array);
    expect(keyed.toJS()).toEqual(testData.Keyed.object);
    expect(set.toJS()).toEqual(testData.Duplicated.array);
  });

  it('converts nested sequences', function() {
    const seq = new SetSequence([
      'a',
      new KeyedSequence([['fox', 'far']]),
      new IndexedSequence([]),
      new SetSequence([true, new KeyedSequence([[1, 2], [3, 4]])]),
    ]);
    expect(seq.toJS()).toEqual(['a', { fox: 'far' }, [], [true, { '1': 2, '3': 4 }]]);
  });

  it('converts nested native data structures', function() {
    const seq = new IndexedSequence([
      new Map([['foo', 'bar']]),
      new Set(['socks', 'shoes']),
      ['bork', 'bork', 'bork'],
    ]);
    expect(seq.toJS()).toEqual([{ foo: 'bar' }, ['socks', 'shoes'], ['bork', 'bork', 'bork']]);
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
    expect(seq.toJS()).toEqual({
      moo: { value: ['moar'] },
      i: { word: { am: 'groot' } },
    });
  });
});
