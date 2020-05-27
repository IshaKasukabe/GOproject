import { Component, OnInit } from '@angular/core';
import {NotificationModel} from '../../shared/model/notification.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../shared/service/notification.service';
import {User} from '../../shared/model/user.model';
import {Company} from '../../shared/model/company.model';
import {UsersService} from "../../shared/service/users.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  idNotification: number;
  notification: NotificationModel;
  user: User;
  company: Company;
  userSee: User;
  companySee: Company;
  canDelete: boolean;
  itUser: boolean;
  added: boolean;
  private routerSubscription: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              private userService: UsersService) { }

   ngOnInit() {
      this.canDelete = false;
      this.route.queryParams.subscribe(params => {
        this.idNotification = params['idNotification'];
      });

      this.notificationService.getNotificationById(this.idNotification).subscribe(
        (notification: NotificationModel) =>  {
          this.notification = notification;
          this.getUserOrCompany();
          this.checkAdded();
        }
      );
  }

  checkAdded() {
    if (this.itUser) {
      for (let i = 0; i < this.user.idNotification.length; i++) {
        if (this.notification.id === this.user.idNotification[i]) {
          this.added = true;
        } else {
          this.added = false;
        }
      }
      for (let i = 0; i < this.user.idEnterNotification.length; i++) {
        if (this.notification.id === this.user.idEnterNotification[i]) {
          this.added = true;
        } else {
          this.added = false;
        }
      }
    } else {
      this.added = true;
    }
  }

  getUserOrCompany() {

    if (window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.company = null;
      this.itUser = true;
      if (this.notification.userId === this.user.id) {
        this.canDelete = true;
      }
    } else if (window.localStorage.getItem('company')) {
      this.company = JSON.parse(window.localStorage.getItem('company'));
      this.user = null;
      this.itUser = false;
      if (this.notification.companyId === this.company.id) {
        this.canDelete = true;
      }
    }
  }

  toMainPage() {
    this.router.navigate(['/base', 'mainpage']);
  }

  addNotification() {
      this.user.idEnterNotification.push(this.notification.id);
      this.userService.updateUser(this.user).subscribe((user: User) => {
        window.localStorage.setItem('user', JSON.stringify(user));
        this.checkAdded();
      });
  }
  deleteNotification() {
    this.notificationService.deleteNotification(this.notification.id).subscribe();

    if (this.user !== null) {
      const id: number[] = this.user.idNotification;
      for (let i = 0; i < id.length; i++) {
        if (id[i] === this.notification.id) {

            id.splice(i, 1 );
            this.user.idNotification = id;
            this.notificationService.deleteNotificationUser(this.user)
              .subscribe((user: User) => {
                window.localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(['/base', 'mainpage']);
              });
        }
      }
    } else if (this.company !== null) {
      const id: number[] = this.company.idNotification;
      for (let i = 0; i < id.length; i++) {
        if (id[i] === this.notification.id) {
          id.splice(i, 1 );
          this.company.idNotification = id;
          this.notificationService.deleteNotificationCompany(this.company)
            .subscribe((company: Company) => {
              window.localStorage.setItem('company', JSON.stringify(company));
              this.router.navigate(['/base', 'mainpage']);
            });
        }
      }
    }

  }

}
