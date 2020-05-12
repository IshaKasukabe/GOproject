import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header-base',
  templateUrl: './header-base.component.html',
  styleUrls: ['./header-base.component.scss']
})
export class HeaderBaseComponent implements OnInit {

  constructor( private authService: AuthService,
               private router: Router) {
  }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toProfile() {
    this.router.navigate(['/base', 'profile']);
  }
  toNotificationEditing() {
    this.router.navigate(['/base', 'notification-editing']);
  }

  toMainPage() {
    this.router.navigate(['/base', 'mainpage']);
  }
}
