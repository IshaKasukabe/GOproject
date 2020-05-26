import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../model/city.model';
import {Region} from '../model/region.model';
import {map} from "rxjs/operators";


@Injectable()
export class CscService {

  constructor(private httpClient: HttpClient) {}

  getAllRegion(): Observable<Region[]> {
     return this.httpClient.get<Region[]>('assets/region.json');
  }

  getAllCity(): Observable<City[]> {
    return this.httpClient.get<City[]>('assets/city.json');
  }

  getRegion(region: string): any {
    this.httpClient.get<any>(`assets/region.json`)
      .pipe(map( (result: Region[]) => {
          for (let i = 0; result.length; i++) {
            if (region === result[i].region) {
              return true;
            } else {
              return false;
            }
          }
      })
      );
  }


  getCity(city: string): any {
    this.httpClient.get<any>(`assets/city.json`)
      .pipe(map( (result: City[]) => {
          for (let i = 0; result.length; i++) {
            if (city === result[i].city) {
              return true;
            } else {
              return false;
            }
          }
        })
      );
  }
}
