import * as utils from '.';

describe('utils::is[type]', () => {
  it('should validate array', () => {
    expect(utils.isArray([])).toBe(true);
    expect(utils.isArray({ foo: 2 })).toBe(false);
  });
  it('should validate Buffer', () => {
    expect(utils.isBuffer(Buffer.from('a'))).toBe(true);
    expect(utils.isBuffer(null)).toBe(false);
    expect(utils.isBuffer(undefined)).toBe(false);
  });
  it('should validate ArrayBuffer', () => {
    expect(utils.isArrayBuffer(new ArrayBuffer(2))).toBe(true);
    expect(utils.isArrayBuffer({})).toBe(false);
  });
  it('should validate ArrayBufferView', () => {
    expect(utils.isArrayBufferView(new DataView(new ArrayBuffer(2)))).toBe(true);
  });
});
