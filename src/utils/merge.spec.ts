import { merge } from './merge';

describe('Utils::merge', () => {
  it('should merge properties', () => {
    const a = { foo: 123 };
    const b = { bar: 456 };
    const c = { foo: 789 };

    const d = merge(a, b, c);

    expect(d.foo).toEqual(789);
    expect(d.bar).toEqual(456);
  });
});
