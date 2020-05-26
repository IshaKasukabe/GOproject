import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { map } from 'rxjs/operators';
import {Company} from '../model/company.model';

@Injectable()
export class  UsersService {

  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User> (`http://localhost:3200/users?email=${email}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));

  }

  getUserByLogin(login: string): Observable<User> {
    return this.httpClient.get<User> (`http://localhost:3200/users?login=${login}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));

  }
  getUserByNick(nick: string): Observable<User> {
    return this.httpClient.get<User> (`http://localhost:3200/users?nick=${nick}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));

  }
  getCompanyByEmail(email: string): Observable<User> {
    return this.httpClient.get<User> (`http://localhost:3200/company?email=${email}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));

  }

  getCompanyByLogin(login: string): Observable<User> {
    return this.httpClient.get<User> (`http://localhost:3200/company?login=${login}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));

  }

  getCompanyByNick(nick: string): Observable<User> {
    return this.httpClient.get<User> (`http://localhost:3200/company?nick=${nick}`)
      .pipe(map((user: User) => user[0] ? user[0] : undefined));

  }

  createNewUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:3200/users`, user);

  }

  createNewCompany(company: Company): Observable<Company> {
    return this.httpClient.post<User>(`http://localhost:3200/company`, company);
  }

  getUserControl(user: User): Observable<User> {
    return this.httpClient.get<User[]>(`http://localhost:3200/users?email=${user.email}&password=${user.password}`)
      .pipe(map(users => users.length !== 0 ? users[0] : undefined));
  }

  getCompanyControl(company: Company): Observable<Company> {
    return this.httpClient.get<Company[]>(`http://localhost:3200/company?email=${company.email}&password=${company.password}`)
      .pipe(map(users => users.length !== 0 ? users[0] : undefined));
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(`http://localhost:3200/users/${user.id}`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`http://localhost:3200/users`);
  }

  getUserById(idUser: number): Observable<User> {
    return this.httpClient.get<User[]>(`http://localhost:3200/users?id=${idUser}`)
      .pipe(map(users => users.length !== 0 ? users[0] : undefined));
  }

  getCompanyById(idCompany: number): Observable<User> {
    return this.httpClient.get<User[]>(`http://localhost:3200/company?id=${idCompany}`)
      .pipe(map(users => users.length !== 0 ? users[0] : undefined));
  }
}



