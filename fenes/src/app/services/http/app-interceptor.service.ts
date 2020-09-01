import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe, zip, range, timer } from 'rxjs';
import { catchError, retry, map, retryWhen, mergeMap } from 'rxjs/operators';
import { APIRouteService } from '../apiroute.service';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService implements HttpInterceptor {

  static AUTHORIZATION = 'Bearer fc4edd92-be20-3385-9f70-edcb1d3a82c7';

  constructor(
    private b: APIRouteService
  ) { }

  handleError(error: HttpErrorResponse) {
    console.log('Error occured');
    console.log(error);
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('app interceptor');

    const headers = new HttpHeaders({
      // 'Origin': this.b.mainBase,
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'application/json',
      Authorization: AppInterceptorService.AUTHORIZATION
    });

    const reqClone = req.clone({
      headers
    });

    console.log(reqClone);

    return next.handle(reqClone)
      .pipe(
        // this.backOff(5, 250),
        retry(10),
        catchError(this.handleError)
      );
  }

  // private backOff(maxTries, ms):  {
  //   return pipe(
  //     retryWhen(attempts => zip(range(1, maxTries), attempts)
  //       .pipe(
  //         map(([i]) => i * i),
  //         mergeMap(i => timer(i * ms))
  //       )
  //     )
  //   );
  // }
}
