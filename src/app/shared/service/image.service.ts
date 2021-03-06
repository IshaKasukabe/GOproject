import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import {NotificationModel} from '../model/notification.model';
import {User} from '../model/user.model';
import {Company} from '../model/company.model';


@Injectable()
export class  ImageService {
  constructor(private httpClient: HttpClient) {
  }

}
