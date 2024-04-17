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
  const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
  const isNativeScript =
    typeof navigator !== 'undefined' &&
    (navigator.product === 'NativeScript' || navigator.product === 'NS');

  return (
    !(isReactNative || isNativeScript) &&
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
};
