import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    console.log(response.message);
    return next.handle().pipe(
      map((data) => {
        // Check if the data is already wrapped
        if (data.data) {
          return data;
        }

        // Otherwise, wrap the data
        const statusCode = response.statusCode || 200;
        return {
          statusCode: statusCode,
          status: "success",
          message: "success",
          data: data,
        };
      }),
    );
  }
}
