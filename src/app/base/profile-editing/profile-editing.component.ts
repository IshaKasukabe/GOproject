import { Component, OnInit } from '@angular/core';
import {ImageService} from "../../shared/service/image.service";
import { AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import { User } from "../../shared/model/user.model"
import {Company} from "../../shared/model/company.model";
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
  itCompany: boolean;
  constructor(private imageService: ImageService,
              private dbFireBase: AngularFireDatabase) { }

  ngOnInit() {

    if (window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
      this.company = null;
      this.itUser = true;
      this.itCompany = false;
      this.formUser = new FormGroup(
        {
          'nick': new FormControl(this.user.nick),
          'firstName': new FormControl(this.user.firstName),
          'lastName': new FormControl(this.user.lastName),
          'region': new FormControl(this.user.region),
          'city': new FormControl(this.user.city),
          'interests': new FormArray([
          ])
        }
      );
    } else if (window.localStorage.getItem('company')) {
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
          'interests': new FormArray([
          ])
        }
      );
      // const storageRefDownload: firebase.storage.Reference = firebase.storage().ref();
      // storageRefDownload.child('/photos/url1').getDownloadURL().then((url) => {
      //  const img = document.getElementById('myimg');
      //  img.src = url;
      // const storageRefDelete = firebase.storage().ref('/photos/url1');
      // storageRefDelete.delete();
      // });

    }
    }


 // fileProgress(event: any) {
  //  this.fileData = event.target.files[0];
//
   // const metaData = {'contentType': this.fileData.type};
//
   // const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/' + this.fileData.name);
  //  storageRef.put(this.fileData, metaData);
  //  const storageRefDownload: firebase.storage.Reference = firebase.storage().ref();
  //  storageRefDownload.child('/photos/' + this.fileData.name).getDownloadURL().then((url) => {
  //      this.imageUrl = url;
 //   });
  // }
}
