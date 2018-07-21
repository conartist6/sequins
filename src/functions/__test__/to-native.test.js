import toNative from '../to-native';
import IndexedSeq from '../../sequence-indexed';
import KeyedSeq from '../../sequence-keyed';
import SetSeq from '../../sequence-set';

describe('toNative', function() {
  it('works with flat structures', function() {
    const indexed = new IndexedSeq([1, 2, 3]);
    const keyed = new KeyedSeq([[1, 1], [2, 2], [3, 3]]);
    const set = new SetSeq([1, 2, 3]);
    expect(toNative(indexed)).toEqual([1, 2, 3]);
    expect(toNative(keyed)).toEqual(new Map([[1, 1], [2, 2], [3, 3]]));
    expect(toNative(set)).toEqual(new Set([1, 2, 3]));
  });

  it('converts nested sequences', function() {
    const seq = new SetSeq([
      'a',
      new KeyedSeq(['fox', 'far']),
      new IndexedSeq([]),
      new SetSeq([true, new KeyedSeq([[1, 2], [3, 4]])]),
    ]);
    expect(toNative(seq)).toEqual(
      new Set(['a', new Map([['f', 'a']]), [], new Set([true, new Map([[1, 2], [3, 4]])])]),
    );
  });

  it('converts nested native data structures', function() {
    const seq = new IndexedSeq([
      new Map([['foo', 'bar']]),
      new SetSeq(['socks', 'shoes']),
      ['bork', 'bork', 'bork'],
    ]);
    expect(toNative(seq)).toEqual([
      new Map([['foo', 'bar']]),
      new Set(['socks', 'shoes']),
      ['bork', 'bork', 'bork'],
    ]);
  });

  it('converts structures inside objects', function() {
    const seq = new KeyedSeq([
      ['moo', { value: new SetSeq(['moar']) }],
      [
        'i',
        {
          phrase: new KeyedSeq([['am', 'groot']]),
        },
      ],
    ]);
    expect(toNative(seq)).toEqual(
      new Map([
        ['moo', new Map([['value', new Set(['moar'])]])],
        ['i', new Map([['phrase', new Map([['am', 'groot']])]])],
      ]),
    );
  });
});
