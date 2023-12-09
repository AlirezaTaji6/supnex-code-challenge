import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import { PaginationResponse } from '../dto/pagination-response.dto';
import { SuccessResponse } from '../dto/success-response.dto';

@Injectable()
export class CommonResponseInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((data) => {
        if (
          data instanceof PaginationResponse ||
          data instanceof HttpException ||
          data instanceof SuccessResponse
        ) {
          return data;
        }

        return new SuccessResponse(data);
      }),
    );
  }
}
