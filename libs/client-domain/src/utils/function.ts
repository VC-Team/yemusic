/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export function isFunction(func: any): func is Function {
  return typeof func === 'function' || func instanceof Function;
}
