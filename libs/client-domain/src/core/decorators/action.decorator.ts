import { VALIDATE_PARAM_METADATA } from '../constants';
import { isFunction } from '../utils';
import { IValidateParams } from './validate-param.decorator';

export function Action() {
  return function (target: Object, propertyName: string | symbol, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;

    if (!isFunction(originalMethod)) {
      throw new TypeError(`@Action decorator can only be applied to methods not: ${typeof originalMethod}`);
    }

    descriptor.value = function (...args: any[]) {
      const validateParams: IValidateParams[] =
        Reflect.getOwnMetadata(VALIDATE_PARAM_METADATA, target, propertyName) || [];

      for (let index = 0; index < validateParams.length; index++) {
        const { paramSchema, paramIndex } = validateParams[index];
        const { data, error } = paramSchema.validate(args[paramIndex]);

        if (error) {
          const errorObject = error.format();
          return JSON.stringify(errorObject, null, 2);
        } else {
          args[paramIndex] = data;
        }
      }

      const result = originalMethod.apply(this, args);
      return result;
    };
  };
}
