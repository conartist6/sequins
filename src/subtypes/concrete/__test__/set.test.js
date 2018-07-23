import SequinsSet from '../set';

describe('SequinsSet', function() {
  it('is a subtype of native Set', function() {
    expect(SequinsSet.prototype).toBeInstanceOf(Set);
  });
});
