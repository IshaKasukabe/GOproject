import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import {SharedModule} from './shared/shared.module';
import {UsersService} from './shared/service/users.service';
import {AuthService} from './shared/service/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {BaseModule} from './base/base.module';
import {NotificationService} from './shared/service/notification.service';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DatePipe} from "@angular/common";
import {CscService} from "./shared/service/csc.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {ImageService} from "./shared/service/image.service";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { environment} from "../environments/environment";
import {CommentsService} from "./shared/service/comments.service";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    BaseModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [
    CommentsService,
    UsersService,
    AuthService,
    NotificationService,
    CscService,
    DatePipe,
    BsModalService,
    ImageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
