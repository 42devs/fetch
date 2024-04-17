import { isArray } from './isType';
/**
 * iterate over an array or key objects, invoke a callback for each item
 *
 * @param {Object|Array} val
 * @param {Function} fn
 */
export const forEach = (val: any, fn: Function): void => {
  if (!val) return;

  const values = isArray(val) ? val : [val];

  values.forEach((v: any, i: number) => {
    fn.call(null, v, i, values);
  });
};
