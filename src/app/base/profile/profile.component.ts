import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/model/user.model";
import {Company} from "../../shared/model/company.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../shared/service/users.service";
import {buffer} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {NotificationModel} from "../../shared/model/notification.model";
import {NotificationService} from "../../shared/service/notification.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  company: Company;
  userSee: User;
  companySee: Company;
  idUser: number;
  idCompany: number;
  itUser: boolean;
  itCompany: boolean;
  canEditing: boolean;
  notifications: NotificationModel[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UsersService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.itCompany = false;
    this.itUser = false;
    this.canEditing = false;

    this.idCompany = null;
    this.idUser = null;

    if (window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.company = null;
    } else if (window.localStorage.getItem('company')) {
      this.company = JSON.parse(window.localStorage.getItem('company'));
      this.user = null;
    }
    this.route.queryParams
      .subscribe(params => {
      this.idUser = params['idUser'];
      this.idCompany = params['idCompany'];
    });

    if (this.idUser) {
      this.userService.getUserById(this.idUser).subscribe((user: User) => {
        this.userSee = user;
        this.itUser = true;
        if (this.user.id === this.userSee.id) {
          this.canEditing = true;
        }
        this.getNotificationUserId(this.userSee.id);
      });
    } else if (this.idCompany) {
      this.userService.getCompanyById(this.idCompany).subscribe( (company: Company) => {
        this.companySee = company;
        this.itCompany = true;
        if (this.company.id === this.companySee.id) {
          this.canEditing = true;
        }
        this.getNotificationCompanyId(this.companySee.id);
      });
    } else if (this.user !== null) {
      this.userSee = this.user;
      this.itUser = true;
      this.canEditing = true;
      this.getNotificationUserId(this.userSee.id);
    } else if (this.company !== null) {
      this.companySee = this.company;
      this.itCompany = true;
      this.canEditing = true;
      this.getNotificationCompanyId(this.companySee.id);
    }
  }

  toEditing() {
    this.router.navigate(['/base', 'profile-editing']);
  }

  toMainPage() {
    this.router.navigate(['/base', 'mainpage']);
  }

  getNotificationUserId(id: number) {
    this.notificationService.getNotificationByUserId(id).subscribe(
      allResult => {
        for (let i = 0; i < allResult.length; i++) {
          this.notifications.push(allResult[i]);
        }
      });
  }

  getNotificationCompanyId(id: number) {
    this.notificationService.getNotificationByCompanyId(id).subscribe(
      allResult => {
        for (let i = 0; i < allResult.length; i++) {
          this.notifications.push(allResult[i]);
        }
      });
  }
}
