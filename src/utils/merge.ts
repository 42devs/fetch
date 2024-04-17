import { isPlainObject, isArray } from './isType';
import { forEach } from './forEach';
/**
 * accept vargs expecting each one to be an object then merge the properties and return it
 *
 * example:
 * ```js
 * const res = merge({foo: 123}, {foo: 456});
 * console.log(res);
 * // output 456
 * ```
 * @param {object} objects
 * @returns {object} result of all parameters merged
 */
export const merge = (...objects: object[]) => {
  const result: object = {};

  const assignValue = (val: any, key: string) => {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  };
  for (let i = 0; i < objects.length; i += 1) {
    forEach(objects[i], assignValue);
  }

  return result;
};
