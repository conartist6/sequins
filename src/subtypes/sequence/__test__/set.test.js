import { SetSequence } from '../../..';

const array = Object.freeze([1, 2, 3]);

describe('SetSequence statics', function() {
  it('can create an setSequence with SetSequence.of', function() {
    const setSequence = SetSequence.of(...array);
    expect(setSequence).toBeInstanceOf(SetSequence);
    expect(Array.from(setSequence)).toEqual(array);
  });
});
