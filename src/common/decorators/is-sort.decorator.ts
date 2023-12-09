import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { Sorts } from '../enums/sorts.enum';

export function IsSort(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSort',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [columnName, sort] = value.split(':');
          return columnName && sort && Sorts[sort];
        },
      },
    });
  };
}
