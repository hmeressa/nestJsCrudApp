import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Before handler execution');

        const request = context.switchToHttp().getRequest();
        console.log('Request:', request.body, request.url);

        return next.handle().pipe(
            tap(() => {
                console.log('After handler execution');
            })
        );
    }
}
