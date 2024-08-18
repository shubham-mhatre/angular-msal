import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;
    const idToken = localStorage.getItem('id_token');
    const accessToken=localStorage.getItem('access_token');
    if(idToken){
      debugger;
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${idToken}`)
      });
      return next.handle(cloned);
    }else{
      debugger;
      return next.handle(request);
    }
  }
}
