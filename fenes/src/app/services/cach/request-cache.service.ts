import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { HttpResponse, HttpRequest } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { UtilitiesService } from '../utilities.service';

export class CacheHeader {

}

export interface Cache {
  cachedAt;
  url: string;
  response: HttpResponse<any>;

}

@Injectable({
  providedIn: 'root',
})
export class RequestCacheService {
  static value: 'cacheable';
  maxAge = 30000; // 30s
  private cache = [];

  constructor(
    private storage: Storage,
    private utils: UtilitiesService
  ) {
    this.loadPersistedCache();
  }


  public get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    console.log('Get the cached response');

    const url = req.urlWithParams;
    let cached;
    cached = this.cache.find((value) => {
      return value.url === url;
    });

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.cachedAt < (Date.now() - this.maxAge);

    if (isExpired) {
      console.log('Cache expired');
    }
    return isExpired ? undefined : cached.response;
  }

  public async put(req: HttpRequest<any>, response: HttpResponse<any>): Promise<void> {

    this.cache.push({
      url: req.urlWithParams,
      response,
      cachedAt: Date.now()
    });
    this.persistCache();
    console.log('done');
    const expired = Date.now() - this.maxAge;
    this.cache.forEach((expiredEntry, index) => {
      if (expiredEntry && expiredEntry.cachedAt < expired) {
        this.cache.splice(index, 1);
      }
    });
  }

  public async putIfCacheable(req: HttpRequest<any>, rep: HttpResponse<any>) {
    if (req.headers.has(this.utils.getCacheHeaderLabel())) {
      this.put(req, rep);
      console.log('Cacheable: put it into the cache');
    } else {
      console.log('Not Cacheable');
    }
  }

  private async persistCache() {
    // this.storage.set('persisted_cache', this.cache).catch(err => {
    //   console.log(err);
    //   console.log(this.cache);
    // });
  }

  private loadPersistedCache() {
    this.storage.get('persisted_cache').then(persisted => {
      if (persisted) {
        this.cache = persisted;
        console.log('Cache loaded from the storage');
      }
    });
  }
}
