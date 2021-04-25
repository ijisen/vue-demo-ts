/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean}
 * @author jisen
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};
