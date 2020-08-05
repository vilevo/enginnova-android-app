import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheService } from '../cach/request-cache.service';

@Injectable({
  providedIn: 'root'
})
export class CachingInterceptorService implements HttpInterceptor {

  constructor(private cache: RequestCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const cachedResponse = false;
    let cachedResponse;
    // console.log('Cache interceptor');
    cachedResponse = this.cache.get(req);
    console.log('Do we cached the rsponse of this request? ');
    console.log(cachedResponse != null);
    console.log(cachedResponse);

    // return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
    return this.sendRequest(req, next, this.cache);
  }

  private sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // cache.putIfCacheable(req, event);
        }
      })
    );
  }
}
