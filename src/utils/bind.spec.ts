import { bind } from './bind';

describe('bind function', () => {
  const mockFn = jest.fn();
  const thisArg = { key: 'value' };
  const boundFn = bind(mockFn, thisArg);

  it('should bind the function to the specified context', () => {
    boundFn();
    expect(mockFn).toHaveBeenCalledWith();
    expect(mockFn).toHaveReturnedWith(undefined);
  });

  it('should pass arguments to the original function', () => {
    boundFn(1, 'hello');
    expect(mockFn).toHaveBeenCalledWith(1, 'hello');
    expect(mockFn).toHaveReturnedWith(undefined);
  });
});
