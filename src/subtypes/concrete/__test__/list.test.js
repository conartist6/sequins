import SequinsList from '../list';

describe('SequinsList', function() {
  it('is a subtype of native Array', function() {
    expect(SequinsList.prototype).toBeInstanceOf(Array);
  });
});
