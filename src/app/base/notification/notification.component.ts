import { Component, OnInit } from '@angular/core';
import {NotificationModel} from '../../shared/model/notification.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../shared/service/notification.service';
import {User} from '../../shared/model/user.model';
import {Company} from '../../shared/model/company.model';

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
  private routerSubscription: Subscription;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService) { }

   ngOnInit() {
      this.canDelete = false;
      this.route.queryParams.subscribe(params => {
        this.idNotification = params['idNotification'];
      });

      this.notificationService.getNotificationById(this.idNotification).subscribe(
        (notification: NotificationModel) =>  {
          this.notification = notification;
          this.getUserOrCompany();
        }
      );
  }

  getUserOrCompany()  {

    if (window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.company = null;
      if (this.notification.userId === this.user.id) {
        this.canDelete = true;
      }
    } else if (window.localStorage.getItem('company')) {
      this.company = JSON.parse(window.localStorage.getItem('company'));
      this.user = null;
      if (this.notification.companyId === this.company.id) {
        this.canDelete = true;
      }
    }
  }

  toMainPage() {
    this.router.navigate(['/base', 'mainpage']);
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
