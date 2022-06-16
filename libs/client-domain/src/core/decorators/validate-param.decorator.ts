import { VALIDATE_PARAM_METADATA } from '../constants';

export interface IValidateParams {
  paramIndex: number;
  paramSchema: any;
}

export function ValidateParam(paramSchema: any) {
  return function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const existingValidateParams: IValidateParams[] =
      Reflect.getOwnMetadata(VALIDATE_PARAM_METADATA, target, propertyKey) || [];

    existingValidateParams.push({
      paramIndex: parameterIndex,
      paramSchema,
    });

    Reflect.defineMetadata(VALIDATE_PARAM_METADATA, existingValidateParams, target, propertyKey);
  };
}
