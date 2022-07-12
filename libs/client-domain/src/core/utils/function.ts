export function isFunction(func: any): func is Function {
  return typeof func === 'function' || func instanceof Function;
}

export function isAsyncFunction(func: any): boolean {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return func instanceof (async () => {}).constructor;
}
