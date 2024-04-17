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
