import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../shared/service/users.service';
import {User} from '../shared/model/user.model';
import {Company} from '../shared/model/company.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  user: User;
  company: Company;
  title = 'Вход';
  constructor(private router: Router,
              private userService: UsersService, ) {}
  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.company = JSON.parse(window.localStorage.getItem('company'));

    if (this.user) {
      this.userService.getUserControl(this.user)
        .subscribe((user: User) => {
          if (user)  {
            this.router.navigate(['/base', 'mainpage']);
          } else {
            this.router.navigate(['/login']);
          }
        });
    } else if (this.company) {
      this.userService.getCompanyControl(this.company)
        .subscribe((company: Company) => {
          if (company)  {
            this.router.navigate(['/base', 'mainpage']);
          } else {
            this.router.navigate(['/login']);
          }
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
