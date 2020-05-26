import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../service/users.service";
import {User} from "../../model/user.model";
import {Company} from "../../model/company.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit {

  @Input() item;
  user: User;
  company: Company;
  itCompany: boolean;
  itUser: boolean;
  unavailable: boolean;
  constructor(private router: Router,
              private userService: UsersService,
              private datePipe: DatePipe) { }

  ngOnInit() {
    this.itCompany = false;
    this.itUser = false;

    if (this.item.userId !== null) {
      this.userService.getUserById(this.item.userId).subscribe((user: User) => {
        this.user = user;
        this.itUser = true;
      });
    } else if (this.item.companyId !== null) {
      this.userService.getCompanyById(this.item.companyId).subscribe((company: Company) => {
        this.company = company;
        this.itCompany = true;
      });
    }

    if (this.item.day > this.datePipe.transform(Date.now(), 'dd.MM.yyyy').toString) {
      this.unavailable = false;
    } else if (this.item.day === this.datePipe.transform(Date.now(), 'dd.MM.yyyy').toString) {
      if (this.item.timeEnding > this.datePipe.transform(Date.now(), 'HH:mm').toString()) {
        this.unavailable = false;
      } else {
        this.unavailable = true;
      }
    } else {
      this.unavailable = true;
    }

  }

  toUserProfile() {
      this.router.navigate(['/base', 'profile'], { queryParams: {
          idUser: this.user.id
        }
      });
  }

  toCompanyProfile() {
    this.router.navigate(['/base', 'profile'], { queryParams: {
        idCompany: this.company.id
      }
    });
  }
  toSee(id: string) {

    this.router.navigate(['/base','notification'], { queryParams: {
        idNotification: +id
      }
    });
  }
}
