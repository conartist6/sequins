import { IndexedSeq } from '../../../index';

const array = Object.freeze([1, 2, 3]);

describe('IndexedSequence statics', function() {
  it('can create an indexedSequence with IndexedSequence.of', function() {
    const indexedSequence = IndexedSeq.of(...array);
    expect(indexedSequence).toBeInstanceOf(IndexedSeq);
    expect(Array.from(indexedSequence)).toEqual(array);
  });
});
