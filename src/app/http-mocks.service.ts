import { Injectable } from '@angular/core';
import { Observable, delay, of, tap, throwError } from 'rxjs';
import { ConsommationDto, IdContrat } from './domain';


@Injectable({
  providedIn: 'root'
})
export class HttpMocksService {

  constructor() { }
  // Appels HTTP:
  getContrats(): Observable<IdContrat[]> {
    return of([1, 2, 5]).pipe(
      delay(2000),
      tap({subscribe:()=>{console.log("getcontrats()")}})
      );
  }

  getConsommation(idContrat: IdContrat): Observable<ConsommationDto> {
    return function() {
      switch (idContrat) {
        case 1:
          return of({ addresse: '3 rue des citrouilles', relevés: [{ pwr: 50 }] });
        case 2:
          return of({ addresse: '2 rue des cacahutes', relevés: [{ pwr: 23 }] });
        case 5:
          return of({
            addresse: '1 rue du jus',
            relevés: [{ pwr: 5 }, { pwr: 50 }],
          });
        default:
          return throwError('erreur');
      }
    } ().pipe(
      tap({subscribe:()=>{console.log(`getConsommation(${idContrat})`)}}),
      delay(1000));
  }

}
