import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Route, Router} from '@angular/router';
import {UsersService} from '../../shared/service/users.service';
import {AuthService} from '../../shared/service/auth.service';
import {User} from '../../shared/model/user.model';
import {Company} from '../../shared/model/company.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UsersService,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup(
      {
        'login': new FormControl(null),
        'password': new FormControl(null)
      });


  }

  onSubmit() {
    const formData = this.form.value;
    this.userService.getUserByEmail(formData.login)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/base', 'mainpage']);
          }
      }});
    this.userService.getUserByLogin(formData.login)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/base', 'mainpage']);
          }
        }});
    this.userService.getCompanyByEmail(formData.login)
      .subscribe((company: Company) => {
        if (company) {
          if (company.password === formData.password) {
            window.localStorage.setItem('company', JSON.stringify(company));
            this.authService.login();
            this.router.navigate(['/base', 'mainpage']);
          }
        }});
    this.userService.getCompanyByLogin(formData.login)
      .subscribe((company: Company) => {
        if (company) {
          if (company.password === formData.password) {
            window.localStorage.setItem('company', JSON.stringify(company));
            this.authService.login();
            this.router.navigate(['/base', 'mainpage']);
          }
        }});
  }
  toRegistration() {
    this.router.navigate(['/registration']);
  }
}
