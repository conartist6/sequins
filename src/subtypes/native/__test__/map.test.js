import SequinsMap from '../map';

describe('SequinsMap', function() {
  it('is a subtype of native Map', function() {
    expect(SequinsMap.prototype).toBeInstanceOf(Map);
  });
});
