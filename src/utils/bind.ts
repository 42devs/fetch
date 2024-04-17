export const bind = (fn: Function, thisArg: any) => {
  return function wrap(...args: any[]) {
    return fn.apply(thisArg, args);
  };
};
