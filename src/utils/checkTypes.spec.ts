import { kindOf, checkTypeOf } from './checkTypes';

describe('Utils::checkTypes', () => {
  it('should return object tag type', () => {
    expect(kindOf({})).toBe('object');
    // cache
    expect(kindOf({})).toBe('object');
    expect(kindOf([])).toBe('array');
  });
});
