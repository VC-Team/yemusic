/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

import { isFunction } from '../utils';

// const ACTION_EXCEPTION_NAME = Symbol('ACTION_EXCEPTION_NAME');

// type IActionExceptionConstructorParams = {
//   message: string;
// };

// export class ActionException {
//   public key = ACTION_EXCEPTION_NAME;
//   public message: string;

//   constructor(params: IActionExceptionConstructorParams) {
//     const { message } = params;

//     this.message = message;
//   }
// }

export function Action() {
  return function (_target: Object, _propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;

    if (!isFunction(originalMethod)) {
      throw new TypeError(`@Action decorator can only be applied to methods not: ${typeof originalMethod}`);
    }

    descriptor.value = function (...args: any[]) {
      const result = originalMethod.apply(this, args);

      return result;
    };
  };
}
