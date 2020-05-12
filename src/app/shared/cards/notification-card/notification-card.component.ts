import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UsersService} from "../../service/users.service";
import {User} from "../../model/user.model";
import {Company} from "../../model/company.model";

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
  constructor(private router: Router,
              private userService: UsersService) { }

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
