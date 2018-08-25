import makeToJS from '../to-js';
import IndexedSeq from '../../subtypes/sequence/indexed';
import KeyedSeq from '../../subtypes/sequence/keyed';
import SetSeq from '../../subtypes/sequence/set';
import Sequence from '../../sequence';

describe('toJS', function() {
  let toJS;

  beforeAll(function() {
    toJS = makeToJS(Sequence);
  });

  it('behaves like toJSON with flat structures', function() {
    const indexed = new IndexedSeq([1, 2, 3]);
    const keyed = new KeyedSeq([[1, 1], [2, 2], [3, 3]]);
    const set = new SetSeq([1, 2, 3]);
    expect(toJS(indexed)).toEqual([1, 2, 3]);
    expect(toJS(keyed)).toEqual({ 1: 1, 2: 2, 3: 3 });
    expect(toJS(set)).toEqual([1, 2, 3]);
  });

  it('converts nested sequences', function() {
    const seq = new SetSeq([
      'a',
      new KeyedSeq(['fox', 'far']),
      new IndexedSeq([]),
      new SetSeq([true, new KeyedSeq([[1, 2], [3, 4]])]),
    ]);
    expect(toJS(seq)).toEqual(['a', { f: 'a' }, [], [true, { '1': 2, '3': 4 }]]);
  });

  it('converts nested native data structures', function() {
    const seq = new IndexedSeq([
      new Map([['foo', 'bar']]),
      new Set(['socks', 'shoes']),
      ['bork', 'bork', 'bork'],
    ]);
    expect(toJS(seq)).toEqual([{ foo: 'bar' }, ['socks', 'shoes'], ['bork', 'bork', 'bork']]);
  });

  it.only('converts structures inside objects', function() {
    debugger;
    const seq = new KeyedSeq([
      ['moo', { value: new SetSeq(['moar']) }],
      [
        'i',
        {
          word: {
            am: 'groot',
          },
        },
      ],
    ]);
    expect(toJS(seq)).toEqual({ moo: { value: ['moar'] }, i: { word: { am: 'groot' } } });
  });
});
