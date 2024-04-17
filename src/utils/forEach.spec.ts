import { forEach } from './forEach';

describe('forEach', () => {
  it('should invoke the callback for each item in the array', () => {
    const mockCallback = jest.fn();
    const testArray = [1, 2, 3];

    forEach(testArray, mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(testArray.length);
    expect(mockCallback).toHaveBeenNthCalledWith(1, 1, 0, testArray);
    expect(mockCallback).toHaveBeenNthCalledWith(2, 2, 1, testArray);
    expect(mockCallback).toHaveBeenNthCalledWith(3, 3, 2, testArray);
  });

  it('should handle non-array input', () => {
    const mockCallback = jest.fn();
    const testValue = { key: 'value' };

    forEach(testValue, mockCallback);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(testValue, 0, [testValue]);
  });

  it('should not invoke the callback if the input value is null or undefined', () => {
    const mockCallback = jest.fn();

    forEach(null, mockCallback);
    forEach(undefined, mockCallback);

    expect(mockCallback).not.toHaveBeenCalled();
  });
});
