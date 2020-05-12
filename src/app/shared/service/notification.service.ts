import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import {NotificationModel} from '../model/notification.model';
import {User} from '../model/user.model';
import {Company} from '../model/company.model';


@Injectable()
export class  NotificationService {

  constructor(private httpClient: HttpClient) {}

  getNotificationByInterest(interest: string): Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]>(`http://localhost:3100/notifications?q=${interest}`);
  }
  getNotificationById(idNotification: number): Observable<NotificationModel> {
    return this.httpClient.get<NotificationModel> (`http://localhost:3100/notifications?id=${idNotification}`)
      .pipe(map((notification: NotificationModel) => notification[0] ? notification[0] : undefined));
  }
  getNotificationByUserId(idUser: number): Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]> (`http://localhost:3100/notifications?userId=${idUser}`);
  }
  getNotificationByCompanyId(idCompany: number): Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]> (`http://localhost:3100/notifications?companyId=${idCompany}`);
  }

  createNewNotification(notification: NotificationModel): Observable<NotificationModel> {
    return this.httpClient.post<NotificationModel>(`http://localhost:3100/notifications`, notification);
  }

  addNewNotificationToUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`http://localhost:3100/users/${user.id}`, user);
  }

  addNewNotificationToCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`http://localhost:3100/company/${company.id}`, company);
  }

  deleteNotification(id: number): Observable<NotificationModel> {
    return this.httpClient.delete<NotificationModel>(`http://localhost:3100/notifications/${id}`);
  }

  deleteNotificationUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`http://localhost:3100/users/${user.id}`, user);
  }

  deleteNotificationCompany(company: Company): Observable<Company> {
  return this.httpClient.put<Company>(`http://localhost:3100/company/${company.id}`, company);
}
}

