export const bind = (fn: Function, thisArg: any) => {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
};
