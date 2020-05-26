import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../shared/service/image.service";
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { User } from "../../shared/model/user.model"
import {Company} from "../../shared/model/company.model";
import {Region} from "../../shared/model/region.model";
import {City} from "../../shared/model/city.model";
import {CscService} from "../../shared/service/csc.service";
import {UsersService} from "../../shared/service/users.service";
@Component({
  selector: 'app-profile-editing',
  templateUrl: './profile-editing.component.html',
  styleUrls: ['./profile-editing.component.scss']
})
export class ProfileEditingComponent implements OnInit {

  imageUrl: string = null;
  fileData: File = null;
  formUser: FormGroup;
  formCompany: FormGroup;
  user: User;
  company: Company;
  itUser: boolean;
  uploadedInterest: boolean;
  interestsNow: string[] = [];
  itCompany: boolean;
  regions: string[] = [];
  cities: string[] = [];
  enterRegion: string;
  enterCity: string;
  dateBirthday: Date = new Date();
  dateBirthdayUpload: boolean;
  urlImage: string;
  constructor(private imageService: ImageService,
              private dbFireBase: AngularFireDatabase,
              private cscService: CscService,
              private usersService: UsersService) { }

  ngOnInit() {

    this.getAllRegion();
    this.dateBirthdayUpload = false;
    this.uploadedInterest = false;
    if (window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.company = null;
      this.itUser = true;
      this.itCompany = false;
      this.formUser = new FormGroup(
        {
          'nick': new FormControl(this.user.nick, [Validators.required], [this.forbiddenNickUser.bind(this), this.forbiddenNickCompany.bind(this)]),
          'firstName': new FormControl(this.user.firstName, [Validators.required]),
          'lastName': new FormControl(this.user.lastName, [Validators.required]),
          'region': new FormControl(null, [], this.forbiddenRegions.bind(this)),
          'city': new FormControl(null, [], this.forbiddenCities.bind(this)),
          'interests': new FormArray([
          ], Validators.required)
        }
      );

      this.enterRegion = this.user.region;
      this.enterCity = this.user.city;
      this.urlImage = this.user.login;
      for (let i = 0; i < this.user.interests.length; i++) {
        (this.formUser.controls['interests'] as FormArray).push(new FormControl(this.user.interests[0]));
        this.interestsNow.push(this.user.interests[0]);
      }

      this.uploadedInterest = true;
      const storageRefDownload: firebase.storage.Reference = firebase.storage().ref();
      storageRefDownload.child('/photos/' + this.urlImage).getDownloadURL().then((url) => {
      const img = document.getElementById('myava');
      img.src = url;
      });

    }
    else if (window.localStorage.getItem('company')) {
      this.company = JSON.parse(window.localStorage.getItem('company'));
      this.user = null;
      this.itUser = false;
      this.itCompany = true;

      this.formCompany = new FormGroup(
        {
          'nick': new FormControl(this.company.nick),
          'companyName': new FormControl(this.company.companyName),
          'region': new FormControl(this.company.region),
          'city': new FormControl(this.company.city),
          'interests': new FormArray([])
        }
      );
    }
  }

  updateUser() {
    this.user.nick = this.formUser.controls['nick'].value;
    this.user.firstName = this.formUser.controls['firstName'].value;
    this.user.lastName = this.formUser.controls['lastName'].value;
    this.user.region = this.formUser.controls['region'].value;
    this.user.city = this.formUser.controls['city'].value;
    this.usersService.updateUser(this.user).subscribe((user: User) => {
          this.user = user;
          window.localStorage.setItem('user', JSON.stringify(this.user));
    });
  }

  updateCompany() {

  }
  fileProgress(event: any) {
    this.fileData = event.target.files[0];

    const metaData = {'contentType': this.fileData.type};

    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/' + this.urlImage);
    storageRef.put(this.fileData, metaData);
    const storageRefDownload: firebase.storage.Reference = firebase.storage().ref();
    storageRefDownload.child('/photos/' + this.urlImage).getDownloadURL().then((url) => {
      const img = document.getElementById('myava');
      img.src = url;
    });
  }
  deleteInterest(index: number) {
    (this.formUser.controls['interests'] as FormArray).removeAt(index);
    console.log(index);
    this.interestsNow.splice(index + 1, 1);
    console.log(this.interestsNow);
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
    this.deleteCities();
    this.cscService.getAllCity().subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        if (result[i].region === this.enterRegion)
          this.cities.push(result[i].city);
      }
    });
  }
  forbiddenEmailsUser(control: FormControl): Promise<any> {
    return  new Promise<any>((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }
  forbiddenEmailsCompany(control: FormControl): Promise<any> {
    return  new Promise<any>((resolve, reject) => {
      this.usersService.getCompanyByEmail(control.value)
        .subscribe((company: Company) => {
          if (company) {
            resolve({forbiddenEmail: true});
          } else {
            resolve(null);
          }
        });
    });
  }
  forbiddenLoginUser(control: FormControl): Promise<any> {
    return  new Promise<any>((resolve, reject) => {
      this.usersService.getUserByLogin(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenLogin: true});
          } else {
            resolve(null);
          }
        });
    });
  }
  forbiddenLoginCompany(control: FormControl): Promise<any> {
    return  new Promise<any>((resolve, reject) => {
      this.usersService.getCompanyByLogin(control.value)
        .subscribe((company: Company) => {
          if (company) {
            resolve({forbiddenLogin: true});
          } else {
            resolve(null);
          }
        });
    });
  }
  forbiddenNickUser(control: FormControl): Promise<any> {
    return  new Promise<any>((resolve, reject) => {
      this.usersService.getUserByNick(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({forbiddenNick: true});
          } else {
            resolve(null);
          }
        });
    });
  }
  forbiddenNickCompany(control: FormControl): Promise<any> {
    return  new Promise<any>((resolve, reject) => {
      this.usersService.getCompanyByNick(control.value)
        .subscribe((company: Company) => {
          if (company) {
            resolve({forbiddenNick: true});
          } else {
            resolve(null);
          }
        });
    });
  }
  forbiddenRegions(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.cscService.getAllRegion()
        .subscribe((regions: Region[]) => {
          let count: number;
          for (let i = 0; i < regions.length; i++) {
            if (control.value === regions[i].region) {
              count++;
              break;
            } else {
              count = 0;
            }
          }
          if ( count > 0) {
            resolve(null);
          } else {
            resolve({forbiddenRegion: true});
          }
        });
    });
  }
  forbiddenCities(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.cscService.getAllCity()
        .subscribe((cities: City[]) => {
          let count: number;
          for (let i = 0; i < cities.length; i++) {
            if (control.value === cities[i].city) {
              count++;
              break;
            } else {
              count = 0;
            }
          }
          if (count > 0) {
            resolve(null);
          } else {
            resolve({forbiddenCity: true});
          }
        });
    });
  }



}
