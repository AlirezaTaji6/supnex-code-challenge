import { IsInt, IsPositive } from 'class-validator';

export function IsId(options?: { each?: boolean }): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    const each = (options && options.each) || false;
    IsInt({ each })(target, propertyKey);
    IsPositive({ each })(target, propertyKey);
  };
}
