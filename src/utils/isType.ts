import { checkTypeOf, kindOf } from './checkTypes';

/**
 * determine an array value
 *
 * @param { any } val
 * @return { boolean }
 */
export const isArray = (val: any): boolean => Array.isArray(val);

/**
 * determine undefined value
 *
 * @param {any} val
 * @returns {boolean}
 */
export const isUndef = (val?: any): boolean => typeof val === 'undefined';

/**
 * determine if val is isBuffer
 *
 * @param {any} val
 * @returns {boolean}
 */
export const isBuffer = (val: any): boolean =>
  val !== null &&
  !isUndef(val) &&
  val.constructor !== null &&
  !isUndef(val.constructor) &&
  typeof val.constructor.isBuffer === 'function' &&
  val.constructor.isBuffer(val);

/**
 * determine if val is array isBuffer
 *
 * @function
 * @param {any} val
 * @returns {boolean}
 */
export const isArrayBuffer = checkTypeOf('ArrayBuffer');

/**
 * determine if value is arrayBufferView
 *
 * @param {any} val
 * @returns {boolean}
 */
export const isArrayBufferView = (val: any) => {
  return ArrayBuffer.isView(val);
};

/**
 * determine if value is string
 * @param {any} val
 * @returns {boolean}
 */
export const isString = (val: any): boolean => typeof val === 'string';

/**
 * determine if value is number
 * @param {any} val
 * @returns {boolean}
 */
export const isNumber = (val: any): boolean => typeof val === 'number';

/**
 * determine if value is object
 * @param {any} val
 * @returns {boolean}
 */
export const isObject = (val: any): boolean => val !== null && typeof val === 'object';

/**
 * determine if value is Plain Object
 *
 * @param {any:console.warn();
 } val
 * @returns {boolean}
 */
export const isPlainObject = (val: any): boolean => {
  if (kindOf(val) !== 'object') return false;
  const prop = Object.getPrototypeOf(val);
  return prop === null || prop === Object.prototype;
};

/**
 * determine if value is data
 *
 * @function
 * @param {any} val
 * @returns {boolean}
 */
export const isDate = checkTypeOf('Date');

/**
 * determine if value is file
 *
 * @function
 * @param {any} val
 * @returns { boolean}  e
 */
export const isFile = checkTypeOf('File');

/**
 * determine if value is Blob
 *
 * @function
 * @param {any} val
 * @returns {boolean}
 */
export const isBlob = checkTypeOf('Blob');

/**
 * determine if value is FileList
 *
 * @param {any} val
 * @returns {boolean}
 */
export const isFileList = checkTypeOf('FileList');

/**
 * determine if value is a function
 *
 * @param {any} val
 * @returns {boolean}
 */
export const isFunction = (val: any): boolean =>
  Object.prototype.toString.call(val) === '[object Function]';

/**
 * determine if value is Stream
 *
 * @param {any} val
 * @returns {boolean}
 */
export const isStream = (val: any): boolean => isObject(val) && isFunction(val.pipe);

/**
 * determine if value is Form Data
 *
 * @param r{any} thing
 * @returns {boolean}
 */
export const isFormData = (thing: any): boolean => {
  const pattern = '[object FormData]';
  return (
    thing &&
    ((typeof FormData === 'function' && thing instanceof FormData) ||
      Object.prototype.toString.call(thing) === pattern ||
      (typeof thing.toString === 'function' && thing.toString() === pattern))
  );
};

/**
 * determine if value is URLSearchParam
 *
 * @param {any} val
 * @returns {boolean}
 */
export const isURLSearchParams = checkTypeOf('URLSearchParams');

export const isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));
