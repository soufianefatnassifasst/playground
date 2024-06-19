import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, any>();
  fetchOrSetCache<T>(key: string, observable: Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      return of(this.cache.get(key) as T);
    } else {
      return observable.pipe(
        map(data => {
          this.cache.set(key, data);
          return data;
        }),
        catchError(error => {
          this.cache.delete(key);
          return of(error);
        })
      );
    }
  }
}
