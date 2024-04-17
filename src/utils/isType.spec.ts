import * as util from './isType';
import { Stream } from 'stream';

describe('Utils::isType', () => {
  it('should validate Array', () => {
    expect(util.isArray([1])).toBe(true);
    expect(util.isArray({ foo: 1 })).toBe(false);
  });
  it('should validate Buffer', () => {
    expect(util.isBuffer(Buffer.from('a'))).toBe(true);
    expect(util.isBuffer(null)).toBe(false);
    expect(util.isBuffer(undefined)).toBe(false);
  });
  it('should validate Array Buffer', () => {
    expect(util.isArrayBuffer(new ArrayBuffer(2))).toBe(true);
    expect(util.isArrayBuffer({})).toBe(false);
  });
  it('should validate Array Buffer View', () => {
    expect(util.isArrayBufferView(new DataView(new ArrayBuffer(2)))).toBe(true);
    expect(util.isArrayBufferView(null)).toBe(false);
  });
  it('should validate Form Data', () => {
    expect(util.isFormData(new FormData())).toBe(true);
    expect(util.isFormData({ key: 'value' })).toBe(false);
  });

  it('should validate Blob', () => {
    expect(util.isBlob(new Blob())).toBe(true);
  });

  it('should validate String', () => {
    expect(util.isString('')).toBe(true);
    expect(util.isString({ toString: () => '' })).toBe(false);
  });

  it('should validate Number', () => {
    expect(util.isNumber(123)).toBe(true);
    expect(util.isNumber('123')).toBe(false);
  });

  it('should validate Undefined', () => {
    expect(util.isUndef()).toBe(true);
    expect(util.isUndef(null)).toBe(false);
  });

  it('should validate Object', () => {
    expect(util.isObject({})).toBe(true);
    expect(util.isObject([])).toBe(true);
    expect(util.isObject(null)).toBe(false);
  });

  it('should validate plain Object', () => {
    expect(util.isPlainObject({})).toBe(true);
    expect(util.isPlainObject([])).toBe(false);
    expect(util.isPlainObject(null)).toBe(false);
    expect(util.isPlainObject(Object.create({}))).toBe(false);
  });

  it('should validate Date', () => {
    expect(util.isDate(new Date())).toBe(true);
    expect(util.isDate(Date.now())).toBe(false);
  });

  it('should validate Function', () => {
    expect(util.isFunction(() => {})).toBe(true);
    expect(util.isFunction('function')).toBe(false);
  });

  it('should validate Stream', () => {
    expect(util.isStream(new Stream.Readable())).toBe(true);
    expect(util.isStream({ foo: 'bar' })).toBe(false);
  });

  it('should validate URLSearchParams', () => {
    expect(util.isURLSearchParams(new URLSearchParams())).toBe(true);
    expect(util.isURLSearchParams('foo=1&bar=2')).toBe(false);
  });

  it('should validate TypedArray instance', () => {
    expect(util.isTypedArray(new Uint8Array([1, 2, 3]))).toBe(true);
    expect(util.isTypedArray([1, 2, 3])).toBe(false);
  });
});
