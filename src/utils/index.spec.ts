import * as utils from '.';

const nullVal = null;

describe('Utils', () => {
  it('isArray - should return true', () => {
    const testVal: string[] = ['a', 'b', 'c'];
    const result = utils.isArray(testVal);

    expect(result).toBe(true);
  });
  it('isArray - should return false', () => {
    const res = utils.isArray(nullVal);

    expect(res).toBe(false);
  });

  it('isUndefinided - should return true', () => {
    const testVal = undefined;
    const res = utils.isUndef(testVal);

    expect(res).toBe(true);
  });
  it('isUndefinided - should return false', () => {
    const res = utils.isUndef(nullVal);

    expect(res).toBe(false);
  });

  it('isBuffer - should return true', () => {
    const testval = Buffer.from('test', 'utf8');
    const res = utils.isBuffer(testval);

    expect(res).toBe(true);
  });
  it('isBuffer - should return false', () => {
    const res = utils.isBuffer(nullVal);

    expect(res).toBe(false);
  });

  it('isArrayBuffer - should be true', () => {
    const testval: ArrayBuffer = new ArrayBuffer(8);
    const res = utils.isArrayBuffer(testval);

    expect(res).toBe(true);
  });
  it('isArrayBuffer - should be false', () => {
    const res = utils.isArrayBuffer(nullVal);

    expect(res).toBe(false);
  });

  it('isArrayBufferView - should be true', () => {
    const testval = new Int32Array(new ArrayBuffer(8));
    const res = utils.isArrayBufferView(testval);

    expect(res).toBe(true);
  });
  it('isArrayBufferView - should be false', () => {
    const res = utils.isArrayBufferView(nullVal);

    expect(res).toBeFalsy();
  });
});
