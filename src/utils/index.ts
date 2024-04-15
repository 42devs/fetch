import { bind } from './bind';

export const kindOf = (() => {
  const cache = Object.create(null);

  return (thing: any) => {
    const str = Object.prototype.toString.call(thing);

    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})();

export const checkTypeOf = (type: string) => {
  const checkType = (thing: any) => kindOf(thing) === type.toLowerCase();
  return checkType;
};

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
export const isUndef = (val: any): boolean => typeof val === 'undefined';

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
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(val);
  }
  return val && val.buffer && isArrayBuffer(val.buffer);
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
 * @param {any} val
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
export const isData = checkTypeOf('Data');

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

/**
 * trim excess whitespaces at the beginning and end of any string
 *
 * @param {string} str
 * @returns {string}
 */
export const trim = (str: string): string =>
  str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
export const isStandardBrowserEnv = () => {
  let product;
  if (
    typeof navigator !== 'undefined' &&
    ((product = navigator.product) === 'ReactNative' ||
      product === 'NativeScript' ||
      product === 'NS')
  ) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
};

/**
 * iterate over an array or key objects, invoke a callback for each item
 *
 * @param {Object|Array} val
 * @param {Function} fn
 */
export const forEach = (val: any, fn: Function): void => {
  if (!val) return;

  if (typeof val !== 'object') val = [val];

  if (isArray(val)) {
    val.forEach((v: any, i: number) => {
      fn.call(null, v, i, val);
    });
  } else {
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        fn.call(null, val[key], key, val);
      }
    }
  }
};

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
export const merge = (...objects: object[]): object => {
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

/**
 * extend and object by mutably adding to properties of other object
 *
 * @param {object} a
 * @param {object} b
 * @param {object} args
 * @returns {object}
 */
export const extend = (a: object, b: object, args: object): object => {
  forEach(b, (val: any, key: string) => {
    if (args && typeof val === 'function') {
      a[key] = bind(val, args);
    } else {
      a[key] = val;
    }
  });
  return a;
};

/**
 * remove byte order marker
 *
 * @param {string} str
 * @returns {string}
 */
export const stripBOM = (str: string): string => {
  if (str.charCodeAt(0) === 0xfeff) {
    return str.slice(1);
  }
  return str;
};

/**
 * Inherit the prototype methods from one constructor into another
 *
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */
export const inherits = (
  constructor: Function,
  superConstructor: Function,
  props?: object,
  descriptors?: PropertyDescriptorMap,
): void => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 *
 * @param {object} sourceObj source object
 * @param {object} [destObj]
 * @param {Function|boolean} [filter]
 * @param {Function} [propFilter]
 * @returns {Object}
 */
export const toFlatObject = (
  sourceObj: object,
  destObj: object = {},
  filter: boolean | Function,
  propFilter: Function,
): object => {
  const merged = {};

  if (sourceObj == null) return destObj;

  let currentObj = sourceObj;
  while (currentObj && currentObj !== Object.prototype) {
    const props = Object.getOwnPropertyNames(currentObj);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if ((!propFilter || propFilter(prop, currentObj, destObj)) && !merged[prop]) {
        destObj[prop] = currentObj[prop];
        merged[prop] = true;
      }
    }
    currentObj = filter !== false && Object.getPrototypeOf(currentObj);
  }

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
export const endsWith = (str: string, searchString: string, position: number = 0): boolean => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};

/**
 * Returns a new array from an array-like object or null if failed
 * @param {*} [thing]
 * @returns {?Array}
 */
export const toArray = (thing: any): Array<any> | null => {
  if (!thing) return null;
  if (Array.isArray(thing)) return thing;
  let i = thing.length;
  if (typeof i !== 'number') return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

export const isTypedArray = (TypedArray: any) => (thing: any) =>
  TypedArray && thing instanceof TypedArray;

export const forEachEntry = (obj: any, fn: any) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

export const matchAll = (regExp: RegExp, str: string) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

export const isHTMLForm = checkTypeOf('HTMLFormElement');

export const hasOwnProperty = (resolver: any) => (obj: any, prop: any) =>
  resolver(Object.prototype.hasOwnProperty)(obj, prop);
