import {
  HttpContextToken,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const BYPASS_AUTH = new HttpContextToken(() => false);

export class TokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.context.get(BYPASS_AUTH) === true) return next.handle(req);

    const token = localStorage.getItem('token');
    if (!token) {
      return next.handle(req);
    }
    const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(headers);
  }
}
