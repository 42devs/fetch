/**
 * trim excess whitespaces at the beginning and end of any string
 *
 * @param {string} str
 * @returns {string}
 */
export const trim = (str: string): string =>
  str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
