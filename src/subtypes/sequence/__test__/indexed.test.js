import { IndexedSequence } from '../../../index';

const array = Object.freeze([1, 2, 3]);

describe('IndexedSequence statics', function() {
  it('can create an indexedSequence with IndexedSequence.of', function() {
    const indexedSequence = IndexedSequence.of(...array);
    expect(indexedSequence).toBeInstanceOf(IndexedSequence);
    expect(Array.from(indexedSequence)).toEqual(array);
  });
});
