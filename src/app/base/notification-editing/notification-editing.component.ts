import {Component, OnInit, TemplateRef} from '@angular/core';
import {NotificationModel} from '../../shared/model/notification.model';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {User} from '../../shared/model/user.model';
import {NotificationService} from '../../shared/service/notification.service';
import {Router} from "@angular/router";
import {Company} from "../../shared/model/company.model";
import {setTheme} from "ngx-bootstrap/utils";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DatePipe} from "@angular/common";
import {CscService} from "../../shared/service/csc.service";


@Component({
  selector: 'app-notification-editing',
  templateUrl: './notification-editing.component.html',
  styleUrls: ['./notification-editing.component.scss']
})
export class NotificationEditingComponent implements OnInit {

  meridian: string[];
  timeBeginning: Date = new Date();
  timeEnding: Date = new Date();
  dateExecution: Date = new Date();
  minDateExecution: Date;
  timeBeginRed: string;
  timeEndRed: string;
  interests: string[];
  interestsNow: string[];
  notification: NotificationModel;
  formNotification: FormGroup;
  regions: string[] = [];
  cities: string[] = [];
  enterRegion: string;
  enterCity: string;
  constructor(private router: Router,
              private notificationService: NotificationService,
              private modalService: BsModalService,
              private datePipe: DatePipe,
              private cscService: CscService) {
  }


  ngOnInit() {
    this.getAllRegion();
    this.enterRegion = "Москва и Московская обл.";
    this.getCityByRegion();
    this.enterRegion = null;
    this.minDateExecution = new Date();
    this.timeBeginRed = this.datePipe.transform(this.timeBeginning, 'HH:mm').toString();
    this.timeEndRed = this.datePipe.transform(this.timeEnding, 'HH:mm').toString();
    this.meridian = ['1', '2', '3', '4'];
    this.interests = [' ', 'Игры', 'Театр', 'Кино', 'Прогулки'];
    this.interestsNow = [''];
    this.formNotification = new FormGroup(
      {
        'name': new FormControl(),
        'about': new FormControl(),
        'interests': new FormArray([
        ]),
        'timeBegin': new FormControl(),
        'timeEnd': new FormControl(),
        'day': new FormControl(),
        'region': new FormControl(),
        'city': new FormControl()
      });
  }

  onSubmit() {
    const {name, about, interests, timeBegin, timeEnd, day, region, city} = this.formNotification.value;
    let userId;
    let companyId;
    let userUpdate: User;
    let companyUpdate;
    if (window.localStorage.getItem('user')) {
      userUpdate = JSON.parse(window.localStorage.getItem('user'));
      userId = userUpdate.id;
      companyId = null;
    } else if (window.localStorage.getItem('company')) {
      companyUpdate = JSON.parse(window.localStorage.getItem('company'));
      userId = null;
      companyId = companyUpdate.id;
    }
    const dayFormat = this.datePipe.transform(day,'dd.MM.yyyy').toString();
    let notification =  new NotificationModel(name, about, interests,
        timeBegin, timeEnd, dayFormat, region, city, userId, companyId, [0]);
    this.notificationService.createNewNotification(notification)
      .subscribe((not: NotificationModel) => {
      notification = not;
        if (userId !== null) {
          const id: number[] = userUpdate.idNotification;
          id.push(notification.id);
          console.log(id);
          userUpdate.idNotification = id;
          this.notificationService.addNewNotificationToUser(userUpdate).subscribe(
            (user: User) => {
              window.localStorage.setItem('user', JSON.stringify(user));
            }
          );
        }

        if (companyId !== null) {
          const id: number[] = companyUpdate.idNotification;
          console.log(notification.id);
          id.push(notification.id);
          companyUpdate.idNotification = id;
          this.notificationService.addNewNotificationToCompany(companyUpdate).subscribe(
            (company: Company) => {
              window.localStorage.setItem('company', JSON.stringify(company));
            }
          );
        }

      this.router.navigate(['/base', 'profile']
      );
    });

  }

  getAllRegion() {
    this.cscService.getAllRegion().subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        this.regions.splice(i + 1,0, result[i].region);
      }
    });
  }

  deleteCities() {
    this.cities = [];
  }
  getCityByRegion() {
    this.cscService.getAllCity().subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].region === this.enterRegion)
          this.cities.push(result[i].city);
      }
    });
  }

  addInterest(interest: string) {
    if (interest !== ' ') {
      let count = 0;
      for (let a = 0; a < this.interestsNow.length; a++) {
        if (interest === this.interestsNow[a]) {
          count++;
        }
      }
      if (count === 0)     {
        (this.formNotification.controls['interests'] as FormArray).push(new FormControl(interest));
        this.interestsNow.push(interest);
      }
    }
  }

  deleteInterest(index: number) {
    (this.formNotification.controls['interests'] as FormArray).removeAt(index);
    console.log(index);
    this.interestsNow.splice(index + 1, 1);
    console.log(this.interestsNow);
  }

  toMainPage() {
    this.router.navigate(['/base', 'mainpage']);
  }

  updateTimeBeginRed() {
    this.timeBeginRed = this.datePipe.transform(this.timeBeginning, 'HH:mm').toString();
  }

  updateTimeEndRed() {
    this.timeEndRed = this.datePipe.transform(this.timeEnding, 'HH:mm').toString();
  }

  enterDefaultRegionAndCity() {
    let user: User;
    let company: Company;
    if (window.localStorage.getItem('user')) {
      user = JSON.parse(window.localStorage.getItem('user'));
      this.formNotification.patchValue({region: user.region});
      this.formNotification.patchValue({city: user.city});
    } else if (window.localStorage.getItem('company')) {
      company = JSON.parse(window.localStorage.getItem('company'));
      this.formNotification.patchValue({region: company.region});
      this.formNotification.patchValue({city: company.city});
    }
  }
}
