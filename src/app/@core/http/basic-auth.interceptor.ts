import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var authdata = window.btoa(
      'ck_7b4684ee96dc94149434141ea30d02dd17b38ed5' + ':' + 'cs_2376b9bcad26490b8bb89241ffb9608380dfa3f5'
    );
    request = request.clone({
      setHeaders: {
        Authorization: 'Basic ' + authdata,
      },
    });
    return next.handle(request);
  }
}
