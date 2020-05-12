import { Component, OnInit } from '@angular/core';
import {Form, FormArray, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersService} from '../../shared/service/users.service';
import {User} from '../../shared/model/user.model';
import {Company} from "../../shared/model/company.model";
import {DatePipe} from "@angular/common";
import {CscService} from "../../shared/service/csc.service";
import {HttpClient} from "@angular/common/http";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  userRegType: boolean;
  companyRegType: boolean;
  formUser: FormGroup;
  formCompany: FormGroup;
  interests: string[];
  interestsNow: string[];
  regions: string[] = [];
  cities: string[] = [];
  enterRegion: string;
  enterCity: string;
  dateBirthday: Date = new Date();
  constructor(private router: Router,
              private usersService: UsersService,
              private datePipe: DatePipe,
              private cscService: CscService,
              private http: HttpClient,
              private angularFireDatabase: AngularFireDatabase) { }

  ngOnInit() {

    this.getAllRegion();

    this.interestsNow = [''];
    this.interests = [' ', 'Игры', 'Театр', 'Кино', 'Прогулки'];
    this.formUser = new FormGroup(
      {
        'login': new FormControl(),
        'email': new FormControl(),
        'password': new FormControl(),
        'nick': new FormControl(),
        'firstName': new FormControl(),
        'lastName': new FormControl(),
        'region': new FormControl(),
        'city': new FormControl(),
        'interests': new FormArray([
        ])
      }
    );

    this.formCompany = new FormGroup(
      {
        'login': new FormControl(),
        'email': new FormControl(),
        'password': new FormControl(),
        'nick': new FormControl(),
        'companyName': new FormControl(),
        'region': new FormControl(),
        'city': new FormControl(),
        'interests': new FormArray([
        ])
      }
    );
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
        (this.formUser.controls['interests'] as FormArray).push(new FormControl(interest));
        this.interestsNow.push(interest);
      }
    }
  }

  deleteInterest(index: number) {
    (this.formUser.controls['interests'] as FormArray).removeAt(index);
    console.log(index);
    this.interestsNow.splice(index + 1, 1);
    console.log(this.interestsNow);
  }

  showUserReg() {
    if (this.userRegType) {
      this.userRegType = false;
      this.companyRegType = false;
    } else {
      this.userRegType = true;
      this.companyRegType = false;
    }
  }

  showCompanyReg() {
    if (this.companyRegType) {
      this.userRegType = false;
      this.companyRegType = false;
    } else {
      this.userRegType = false;
      this.companyRegType = true;
    }
  }

  onSubmitUser() {
    const dateNow = this.datePipe.transform(Date.now(), 'dd.MM.yyyy').toString();
    const birthday = this.datePipe.transform(this.dateBirthday, 'dd.MM.yyyy').toString();
    const {login, email, password, nick, firstName, lastName, region, city, interests} = this.formUser.value;
    const user = new User(login, email, password, null, nick, firstName, lastName, null, birthday, region, city, interests, dateNow, [0], [0], [0],[0], [0]);
    this.usersService.createNewUser(user).subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogIn: true
          }
        });
      });
  }

  onSubmitCompany() {
    const dateNow = this.datePipe.transform(Date.now(), 'dd.MM.yyyy').toString();
    const {login, email, password, nick, companyName,  region, city, interests} = this.formCompany.value;
    const company = new Company(login, email, password, null, nick, companyName, null, region, city, interests, dateNow, [0], [0],[0], [0]);
    this.usersService.createNewCompany(company).subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogIn: true
        }
      });
    });
  }
  toLogin() {
    this.router.navigate(['/login']);
  }

}
