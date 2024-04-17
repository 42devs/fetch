import { trim } from './trim';

describe('Utils::trim', () => {
  it('should trim whitespaces', () => {
    expect(trim('  foo  ')).toEqual('foo');
    expect(trim('Hello')).toBe('Hello');
    expect(trim('')).toBe('');
  });
  it('should trim tabs', () => {
    expect(trim('\tfoo\t')).toEqual('foo');
  });
});
