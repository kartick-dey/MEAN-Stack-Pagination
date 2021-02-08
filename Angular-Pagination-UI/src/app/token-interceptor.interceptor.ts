import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({ providedIn: 'root'})
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private appService: AppService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.appService.getToken();
    if (token) {
      const clonedRequest = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
