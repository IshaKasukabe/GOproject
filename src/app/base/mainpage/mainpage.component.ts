import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationComponent} from '../notification/notification.component';
import {forkJoin} from 'rxjs';
import {NotificationService} from '../../shared/service/notification.service';
import {User} from '../../shared/model/user.model';
import {Company} from '../../shared/model/company.model';
import {NotificationModel} from '../../shared/model/notification.model';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainPageComponent implements OnInit {

  notifications: NotificationModel[] = [];
  user: User;
  company: Company;
  interests: string[];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService) { }

  ngOnInit() {
    if (window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.interests = this.user.interests;
    } else if (window.localStorage.getItem('company')) {
      this.company = JSON.parse(window.localStorage.getItem('company'));
      this.interests = this.company.interests;
    }

    for (let i = 0; i < this.interests.length; i++) {
      this.route.params.subscribe(() => {
        forkJoin([
          this.notificationService.getNotificationByInterest(this.interests[i])
        ]).subscribe(
          allResult => {
            const notPush: NotificationModel[] = allResult[0];
            for (let j = 0; j < notPush.length; j++) {
            this.notifications.push(notPush[j]);
            }
          }
        );
      });
    }
  }
}
