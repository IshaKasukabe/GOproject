import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../model/city.model';
import {Region} from '../model/region.model';


@Injectable()
export class CscService {

  constructor(private httpClient: HttpClient) {}

  getAllRegion(): Observable<Region[]> {
     return this.httpClient.get<Region[]>('assets/region.json');
  }

  getAllCity(): Observable<City[]> {
    return this.httpClient.get<City[]>('assets/city.json');
  }

}
