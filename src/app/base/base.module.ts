import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base.component';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { NotificationComponent } from './notification/notification.component';
import {NotificationEditingComponent} from './notification-editing/notification-editing.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileEditingComponent} from './profile-editing/profile-editing.component';
import { MainPageComponent } from './mainpage/mainpage.component';
import { ProfilesPageComponent } from './profiles-page/profiles-page.component';
import {HeaderBaseComponent} from '../shared/header/header-base/header-base.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";


@NgModule({
  declarations: [
    BaseComponent,
    HeaderBaseComponent,
    NotificationComponent,
    NotificationEditingComponent,
    ProfileComponent,
    ProfileEditingComponent,
    MainPageComponent,
    ProfilesPageComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
})
export class BaseModule { }
