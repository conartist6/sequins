import { SetSeq } from '../../../index';

const array = Object.freeze([1, 2, 3]);

describe('SetSeq statics', function() {
  it('can create an setSequence with SetSeq.of', function() {
    const setSequence = SetSeq.of(...array);
    expect(setSequence).toBeInstanceOf(SetSeq);
    expect(Array.from(setSequence)).toEqual(array);
  });
});
